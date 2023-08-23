import type { PromodElementType } from 'promod/built/interface';
import { waitForCondition } from 'sat-utils';
import { $ } from '../../lauch/engine';

class BasePage {
  root: PromodElementType;

  constructor(root: string | PromodElementType) {
    this.root = typeof root === 'string' ? $(root) : root;
  }

  async waitForPageReady() {
    await waitForCondition(async () => await this.root.isDisplayed(), {
      timeout: 7500,
      message: () => `${this.constructor.name} is not visible`,
    });
  }
}

export { BasePage };
