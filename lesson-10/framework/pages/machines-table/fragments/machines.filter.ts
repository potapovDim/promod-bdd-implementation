import { BaseFragment, Input, Button } from '../../../../lib';

class MachineFiltersFragment extends BaseFragment {
  filter: Button;
  manufacturer: Input;
  workVolume: Input;
  price: Input;

  constructor(selector, name) {
    super(selector, name);

    this.manufacturer = this.init(this.root.$('.filtering input[placeholder="Виробник"]'), 'Manufacturer', Input);
    this.workVolume = this.init(this.root.$(`.filtering input[placeholder="Робочий об'єм"]`), 'Work volume', Input);
    this.price = this.init(this.root.$(`.filtering input[placeholder="Ціна"]`), 'Price', Input);
    this.filter = this.init(this.root.$('xpath=.//*[text()="Фільтрувати"]'), 'Filter button', Button);
  }
}

export { MachineFiltersFragment };
