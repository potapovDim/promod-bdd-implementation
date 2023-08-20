import { expect } from 'chai';
import { sleep, lengthToIndexesArray, asyncMap } from 'sat-utils';
import { provider } from '../framework';
import { LoginFragment, MachineListRowFragment, MachineFiltersFragment } from '../framework/fragments';

const { browser } = provider;
const { $$, $ } = provider.elementsInterface;
const { waitForCondition } = provider.waiters;

describe('Login test suite', () => {
  beforeEach('Set up', async () => {
    await browser.get('http://localhost:4000/');
    await waitForCondition(async () => await $('body').isPresent());
    await browser.executeScript(() => localStorage.clear());
    await browser.get('http://localhost:4000/');
  });

  it.only('Filter machines by manufacturer', async () => {
    const filterManufacturer = 'ITALMIX DUPLEX';
    await new LoginFragment().login({ username: 'admin', password: 'admin' });

    await new MachineFiltersFragment().filter({ manufacturer: filterManufacturer });
    const allAvailableMachineRows = $$('#table_page > div.machies_list_section > table > tbody > tr');
    const count = await allAvailableMachineRows.count();

    const result = await asyncMap(lengthToIndexesArray(count), async (index) => {
      const machineRow = new MachineListRowFragment(index);

      return await machineRow.getMachineData();
    });

    result.forEach((machineData) => expect(machineData.manufacturer).to.include(filterManufacturer));
  });
});
