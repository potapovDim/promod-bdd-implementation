import type { PromodElementType } from 'promod/built/interface';

import { Base } from './base';

class BaseFragment extends Base {
  constructor(root: string | PromodElementType, name: string) {
    super(root, name);
  }
}

export { BaseFragment };
