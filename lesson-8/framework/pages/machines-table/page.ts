import { BasePage, Collection } from '../../../lib';
import { MachineListRowFragment } from './fragments/machine.list.row';
import { MachineFiltersFragment } from './fragments/machines.filter';

class MachinesTablePage extends BasePage {
  machines;
  filters: MachineFiltersFragment;

  constructor() {
    super('#table_page', 'Machine table page');

    this.filters = this.init('xpath=//*[@class="table filtering"]/parent::*', 'Filters', MachineFiltersFragment);
    this.machines = this.init(
      'div.machies_list_section > table > tbody > tr',
      'Machine row item',
      Collection,
      MachineListRowFragment,
    );
  }
}

export { MachinesTablePage };
