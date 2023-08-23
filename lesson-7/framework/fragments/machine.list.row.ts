import type { PromodElementType } from 'promod/built/interface';

import { BaseFragment } from '../../lib';

class MachineListRowFragment extends BaseFragment {
  manufacturer: PromodElementType;
  workVolume: PromodElementType;
  length: PromodElementType;
  width: PromodElementType;
  mass: PromodElementType;
  tracktorPower: PromodElementType;
  price: PromodElementType;

  constructor(selector: string | PromodElementType) {
    super(selector);

    this.manufacturer = this.root.$('td:nth-child(1) span');
    this.workVolume = this.root.$('td:nth-child(2)');
    this.length = this.root.$('td:nth-child(3)');
    this.width = this.root.$('td:nth-child(4)');
    this.mass = this.root.$('td:nth-child(5)');
    this.tracktorPower = this.root.$('td:nth-child(6)');
    this.price = this.root.$('td:nth-child(7)');
  }
}

export { MachineListRowFragment };
