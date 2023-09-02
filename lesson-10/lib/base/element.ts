import type { PromodElementType } from 'promod/built/interface';
import { waitForCondition, isNull } from 'sat-utils';

import { LayerBase } from './layer.base';

class BaseElement extends LayerBase {
  constructor(root: string | PromodElementType, name: string) {
    super(root, name);
  }

  async waitForRootReady() {
    await waitForCondition(async () => await this.root.isDisplayed(), {
      timeout: 7500,
      message: () => `${this.constructor.name} ${this.id} is not visible`,
    });
  }

  async action(actionName: string | null) {
    if (isNull(actionName)) {
      actionName = 'click';
    }

    // TODO impelment more base actions
    await this[actionName]();
  }

  private async click() {
    await this.root.click();
  }

  async getData(): Promise<string> {
    await this.waitForRootReady();

    return await this.root.getText();
  }
}

export { BaseElement };
