import { waitForCondition } from 'sat-utils';
import { $, $$, browser } from '../lauch/engine';

const waitLoginForm = async () =>
  await waitForCondition(async () => await $('.login_form').isDisplayed(), {
    timeout: 5000,
    message: 'Login form is not visible',
  });

describe('Login test suite', () => {
  beforeEach('Set up', async () => {
    await browser.get('http://localhost:4000/');
    await waitForCondition(async () => await $('body').isPresent());
    await browser.executeScript(() => localStorage.clear());
    await browser.get('http://localhost:4000/');
  });

  it('Admin success login', async () => {
    await waitLoginForm();

    await $$('input').get(0).sendKeys('admin');
    await $$('input').get(1).sendKeys('admin');
    await $$('button').get(2).click();

    await waitForCondition(async () => await $('#table_page').isDisplayed());
    await waitForCondition(async () => await $('xpath=//button[text()="До адмін кабінету"]').isDisplayed());
  });

  it('User success login', async () => {
    await waitLoginForm();

    await $$('input').get(0).sendKeys('Test');
    await $$('input').get(1).sendKeys('Test');
    await $$('button').get(2).click();

    await waitForCondition(async () => await $('#table_page').isDisplayed());
    await waitForCondition(async () => !(await $('xpath=//button[text()="До адмін кабінету"]').isDisplayed()));
  });
});
