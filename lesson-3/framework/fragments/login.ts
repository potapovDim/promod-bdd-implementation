import type { PromodElementType } from 'promod/built/interface';
import { waitForCondition } from 'sat-utils';
import { $ } from '../../lauch/engine';

class LoginFragment {
  // рутовий елемент в межах якого ми шукаємо дочірні елементи
  root: PromodElementType;
  // поле логіну де ми вводимо ім'я користувача
  username: PromodElementType;
  // поле паролю де ми вводимо пароль користувача
  password: PromodElementType;
  // кнопка "Увійти"
  signIn: PromodElementType;

  constructor() {
    this.root = $('.login_form');

    this.username = this.root.$$('input').get(0);
    this.password = this.root.$$('input').get(1);

    this.signIn = this.root.$('button');
  }

  async waitLoginForm() {
    await waitForCondition(async () => await this.root.isDisplayed(), {
      timeout: 5000,
      message: 'Login form is not visible',
    });
  }

  async login(loginData: { username?: string; password?: string }) {
    // Очікуємо що логі форма відображається на сторінці
    await this.waitLoginForm();

    const loginDataKeys = Object.keys(loginData); // ['username', 'password'], ['password', 'username'], ['username'], ['password']

    /**
    await new LoginFragment().login({ username: 'admin' })
    стрічка 30 в середині методу login  const loginDataKeys = ['username']

    for (const key of loginDataKeys) { // key = 'username'
      const value = loginData[key] // ({ username: 'admin' })['username'] = 'admin'
      await this['username'].sendKeys('admin')
    }

    await this.signIn.click();


    */

    for (const key of loginDataKeys) {
      const value = loginData[key];

      await this[key].sendKeys(value);
    }
    await this.signIn.click();
  }
}

export { LoginFragment };
