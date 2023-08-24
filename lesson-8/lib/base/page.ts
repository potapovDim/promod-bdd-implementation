import type { PromodElementType } from 'promod/built/interface';
import { waitForCondition } from 'sat-utils';
import { $ } from '../../lauch/engine';
import { Collection } from './collection';

class BasePage {
  root: PromodElementType;
  id: string;

  constructor(root: string | PromodElementType, name: string) {
    this.root = typeof root === 'string' ? $(root) : root;
    this.id = name;
  }

  protected init(selector: string | PromodElementType, childName: string, Child, CollectionChild?) {
    let childRoot;

    // TODO this should be improved
    if (Child === Collection) {
      childRoot = typeof selector === 'string' ? this.root.$$(selector) : selector;
    } else {
      childRoot = typeof selector === 'string' ? this.root.$(selector) : selector;
    }

    return new Child(childRoot, childName, CollectionChild);
  }

  async waitForPageReady() {
    await waitForCondition(async () => await this.root.isDisplayed(), {
      timeout: 7500,
      message: () => `${this.constructor.name} ${this.id} is not visible`,
    });
  }
}

export { BasePage };
