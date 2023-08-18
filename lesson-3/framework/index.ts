import { waitForCondition } from 'sat-utils';
import { browser, $, $$ } from '../lauch/engine';

const provider = {
  get browser() {
    return browser;
  },
  get waiters() {
    return { waitForCondition };
  },
  get elementsInterface() {
    return {
      $,
      $$,
    };
  },
};

export { provider };
