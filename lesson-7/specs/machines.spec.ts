import { expect } from 'chai';
import { provider } from '../framework';
import { LoginFragment, MachineFiltersFragment } from '../framework/fragments';
import { MachinesTablePage } from '../framework/pages';

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

    const result = await new MachinesTablePage().machinesCollection.getData({ manufacturer: null });

    console.log(result, '<');

    result.forEach((machineData) => expect(machineData.manufacturer).to.include(filterManufacturer));
  });
});
