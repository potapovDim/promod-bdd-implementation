import { expect } from 'chai';
import { provider } from '../framework';
import { MachinesTablePage, MainPage } from '../framework/pages';

const { browser } = provider;
const { $ } = provider.elementsInterface;
const { waitForCondition } = provider.waiters;

describe('Login test suite', () => {
  beforeEach('Set up', async () => {
    await browser.get('http://localhost:4000/');
    await waitForCondition(async () => await $('body').isPresent());

    await browser.executeScript(() => localStorage.clear());
    await browser.get('http://localhost:4000/');
  });

  it.only('Filter machines by manufacturer', async () => {
    const machinesPage = new MachinesTablePage();
    const mainPage = new MainPage();

    const filterManufacturer = 'ITALMIX DUPLEX';

    // TODO
    await mainPage.sendKeys({ login: { username: 'admin', password: 'admin' } });
    await mainPage.click({ login: { signIn: null } });

    await machinesPage.sendKeys({ filters: { manufacturer: filterManufacturer } });
    await machinesPage.click({ filters: { filter: null } });

    const result = await machinesPage.getData({ machines: { manufacturer: null } });

    result.machines.forEach((machineData) => expect(machineData.manufacturer).to.include(filterManufacturer));
  });
});
