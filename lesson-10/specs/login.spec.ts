import { provider } from '../framework';
// import { LoginFragment } from '../framework/fragments';

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

  it('Admin success login', async () => {
    // await new LoginFragment().login({ username: 'admin', password: 'admin' });

    // await waitForCondition(async () => await $('#table_page').isDisplayed());
    // await waitForCondition(async () => await $('xpath=//button[text()="До адмін кабінету"]').isDisplayed());
  });

  it('User success login', async () => {
    // await new LoginFragment().login({ username: 'Test', password: 'Test' });

    // await waitForCondition(async () => await $('#table_page').isDisplayed());
    // await waitForCondition(async () => !(await $('xpath=//button[text()="До адмін кабінету"]').isDisplayed()));
  });
});
