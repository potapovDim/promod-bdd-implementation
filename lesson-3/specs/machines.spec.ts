import { provider } from '../framework';
import { LoginFragment, MachineListRowFragment } from '../framework/fragments';

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

  it.only('Get machine data login', async () => {
    await new LoginFragment().login({ username: 'admin', password: 'admin' });
    await waitForCondition(async () => await $('#table_page').isDisplayed());

    console.log(await new MachineListRowFragment(0).getMachineData());
    console.log(await new MachineListRowFragment(1).getMachineData());
  });
});
