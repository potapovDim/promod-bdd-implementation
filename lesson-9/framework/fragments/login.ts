import type { PromodElementType } from 'promod/built/interface';

import { BaseFragment } from '../../lib';

class LoginFragment extends BaseFragment {
  // поле логіну де ми вводимо ім'я користувача
  username: PromodElementType;
  // поле паролю де ми вводимо пароль користувача
  password: PromodElementType;
  // кнопка "Увійти"
  signIn: PromodElementType;

  constructor() {
    super('.login_form', 'Login form');

    this.username = this.root.$$('input').get(0);
    this.password = this.root.$$('input').get(1);

    this.signIn = this.root.$('button');
  }

  // TODO
  async login(data: { username?: string; password?: string }) {
    await this.sendKeys(data);
    await this.signIn.click();
  }
}

export { LoginFragment };
