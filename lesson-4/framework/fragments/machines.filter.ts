import type { PromodElementType } from 'promod/built/interface';
import { waitForCondition } from 'sat-utils';
import { $ } from '../../lauch/engine';

class MachineFiltersFragment {
  root: PromodElementType;
  filterButton: PromodElementType;
  manufacturer: PromodElementType;
  workVolume: PromodElementType;
  price: PromodElementType;

  constructor() {
    this.root = $('xpath=//*[@class="table filtering"]/parent::*');
    this.manufacturer = this.root.$('.filtering input[placeholder="Виробник"]');
    this.workVolume = this.root.$(`.filtering input[placeholder="Робочий об'єм"]`);
    this.price = this.root.$(`.filtering input[placeholder="Ціна"]`);
    this.filterButton = this.root.$('xpath=.//*[text()="Фільтрувати"]');
  }

  // TODO
  async waitFiltersFragment() {
    await waitForCondition(async () => await this.root.isDisplayed(), {
      timeout: 5000,
      message: 'Machine row is not visible',
    });
  }

  // TODO
  async filter(filterData: { manufacturer?: string; workVolume?: string; price?: string }) {
    // Очікуємо що фрагмент фільтр (тобто його рутовий елемент) присутній і відображається на сторінці
    await this.waitFiltersFragment();

    const filterDataKeys = Object.keys(filterData);

    for (const key of filterDataKeys) {
      const value = filterData[key];

      await this[key].sendKeys(value);
    }

    await this.filterButton.click();
  }
}

export { MachineFiltersFragment };
