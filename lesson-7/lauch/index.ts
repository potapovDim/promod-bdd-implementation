import { engine } from './engine';

before(async () => {
  await engine.getDriver(engine.browser);
});

after(async () => {
  try {
    await engine.browser.quitAll();
  } catch (error) {
    console.log('Error closing browser', error);
  }
});
