import type { PromodElementType } from 'promod/built/interface';
import { waitForCondition } from 'sat-utils';
import { $ } from '../../lauch/engine';
import { Collection } from './collection';

class BaseFragment {
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

  async waitForFragmentReady() {
    await waitForCondition(async () => await this.root.isDisplayed(), {
      timeout: 7500,
      message: () => `${this.constructor.name} ${this.id} is not visible`,
    });
  }

  async getData(data: { [k: string]: null } = {}) {
    await this.waitForFragmentReady();

    const dataKeys = Object.keys(data);

    const result = {};

    for (const key of dataKeys) {
      // TODO figure out how to with nested fragments
      result[key] = await this[key].getText();
    }

    return result;
  }

  async sendKeys(data: { [k: string]: any }) {
    await this.waitForFragmentReady();

    const dataKeys = Object.keys(data);

    for (const key of dataKeys) {
      const value = data[key];

      await this[key].sendKeys(value);
    }
  }
}

export { BaseFragment };
