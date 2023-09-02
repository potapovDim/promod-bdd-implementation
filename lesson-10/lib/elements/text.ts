import type { PromodElementType } from 'promod/built/interface';
import { BaseElement } from '../base/element';

class Text extends BaseElement {
  constructor(root: string | PromodElementType, name: string) {
    super(root, name);
  }

  async sendKeys() {
    throw new TypeError(`${this.constructor.name} ${this.id} does not support sendKeys method`);
  }
}

export { Text };
