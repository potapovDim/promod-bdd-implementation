import type { PromodElementType } from 'promod/built/interface';

import { Base } from './base';

class BasePage extends Base {
  constructor(root: string | PromodElementType, name: string) {
    super(root, name);
  }
}

export { BasePage };
