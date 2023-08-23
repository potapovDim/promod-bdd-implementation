import { BasePage, Collection } from '../../lib';
import { MachineListRowFragment } from '../fragments/machine.list.row';

class MachinesTablePage extends BasePage {
  machinesCollection;

  constructor() {
    super('#table_page');

    this.machinesCollection = new Collection(
      '#table_page > div.machies_list_section > table > tbody > tr',
      MachineListRowFragment,
    );
  }
}

export { MachinesTablePage };
