import type { PromodElementType } from 'promod/built/interface';

import { BaseFragment } from '../../lib';

class MachineFiltersFragment extends BaseFragment {
  filterButton: PromodElementType;
  manufacturer: PromodElementType;
  workVolume: PromodElementType;
  price: PromodElementType;

  constructor() {
    super('xpath=//*[@class="table filtering"]/parent::*');

    this.manufacturer = this.root.$('.filtering input[placeholder="Виробник"]');
    this.workVolume = this.root.$(`.filtering input[placeholder="Робочий об'єм"]`);
    this.price = this.root.$(`.filtering input[placeholder="Ціна"]`);
    this.filterButton = this.root.$('xpath=.//*[text()="Фільтрувати"]');
  }

  // TODO
  async filter(filterData: { manufacturer?: string; workVolume?: string; price?: string }) {
    // Очікуємо що фрагмент фільтр (тобто його рутовий елемент) присутній і відображається на сторінці
    await this.waitForFragmentReady();

    const filterDataKeys = Object.keys(filterData);

    for (const key of filterDataKeys) {
      const value = filterData[key];

      await this[key].sendKeys(value);
    }

    await this.filterButton.click();
  }
}

export { MachineFiltersFragment };
