import type { PromodElementType } from 'promod/built/interface';

import { Base } from './base';

class BaseFragment extends Base {
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
      await this[key].click();
    }
  }

  async getData(data: { [k: string]: null } = {}): Promise<{ [k: string]: string }> {
    await this.waitForRootReady();

    const dataKeys = Object.keys(data);

    const result = {};

    for (const key of dataKeys) {
      /**
       * !@info page properties should be base library elements, not fragments
       */
      result[key] = await this[key].getText();
    }

    return result;
  }
}

export { BaseFragment };
