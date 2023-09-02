import type { PromodElementType } from 'promod/built/interface';

import { waitForCondition } from 'sat-utils';
import { Collection } from './collection';
import { LayerBase } from './layer.base';

class Base extends LayerBase {
  root: PromodElementType;
  id: string;

  constructor(root: string | PromodElementType, name: string) {
    super(root, name);
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
    /**
     * @info this is a workaround for playwright engine, if H or W is 0 - root is not visible
     */
    await waitForCondition(async () => await this.root.isPresent(), {
      timeout: 7500,
      message: () => `${this.constructor.name} ${this.id} is not visible`,
    });
  }

  async click(data: { [k: string]: any }): Promise<void> {
    await this.waitForRootReady();

    const dataKeys = Object.keys(data);

    for (const key of dataKeys) {
      /**
       * !@info page properties should be base library elements, not fragments
       */
      await this[key].click(data[key]);
    }
  }

  async getData(data: { [k: string]: any } = {}): Promise<{ [k: string]: any }> {
    await this.waitForRootReady();

    const dataKeys = Object.keys(data);

    const result = {};

    for (const key of dataKeys) {
      /**
       * !@info page properties should be base library elements, not fragments
       */
      result[key] = await this[key].getData(data[key]);
    }

    return result;
  }

  async sendKeys(data: { [k: string]: any }): Promise<void> {
    await this.waitForRootReady();

    const dataKeys = Object.keys(data);

    for (const key of dataKeys) {
      const value = data[key];

      await this[key].sendKeys(value);
    }
  }
}

export { Base };
