import type { PromodElementType } from 'promod/built/interface';
import { BaseElement } from '../base/element';

class Input extends BaseElement {
  constructor(root: string | PromodElementType, name: string) {
    super(root, name);
  }

  async sendKeys(value: string | number) {
    await this.waitForRootReady();
    await this.root.sendKeys(value);
  }
}

export { Input };
