import type { PromodElementType } from 'promod/built/interface';

import { waitForCondition } from 'sat-utils';
import { $ } from '../../lauch/engine';

class LayerBase {
  root: PromodElementType;
  id: string;

  constructor(root: string | PromodElementType, name: string) {
    this.root = typeof root === 'string' ? $(root) : root;
    this.id = name;
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
}

export { LayerBase };
