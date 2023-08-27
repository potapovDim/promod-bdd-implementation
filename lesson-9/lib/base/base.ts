import type { PromodElementType } from 'promod/built/interface';
import { waitForCondition } from 'sat-utils';
import { $ } from '../../lauch/engine';
import { Collection } from './collection';

class Base {
  root: PromodElementType;
  id: string;

  constructor(root: string | PromodElementType, name: string) {
    this.root = typeof root === 'string' ? $(root) : root;
    this.id = name;
  }

  protected init(selector: string | PromodElementType, childName: string, Child, CollectionChild?) {
    // TODO add some logging logic here
    let childRoot;

    // TODO this should be improved
    if (Child === Collection) {
      childRoot = typeof selector === 'string' ? this.root.$$(selector) : selector;
    } else {
      childRoot = typeof selector === 'string' ? this.root.$(selector) : selector;
    }

    return new Child(childRoot, childName, CollectionChild);
  }

  async waitForRootReady() {
    await waitForCondition(async () => await this.root.isDisplayed(), {
      timeout: 7500,
      message: () => `${this.constructor.name} ${this.id} is not visible`,
    });
  }

  async sendKeys(data: { [k: string]: any }) {
    await this.waitForRootReady();

    const dataKeys = Object.keys(data);

    for (const key of dataKeys) {
      const value = data[key];

      await this[key].sendKeys(value);
    }
  }
}

export { Base };
