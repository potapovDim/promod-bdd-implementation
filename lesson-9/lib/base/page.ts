import type { PromodElementType } from 'promod/built/interface';
import { Base } from './base';

class BasePage extends Base {
  constructor(root: string | PromodElementType, name: string) {
    super(root, name);
  }

  async click(data: { [k: string]: any }) {
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
       * !@info page properties should be fragments, not base library elements
       */
      result[key] = await this[key].getData(data[key]);
    }

    return result;
  }
}

export { BasePage };
