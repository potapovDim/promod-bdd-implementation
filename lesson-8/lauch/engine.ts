import { seleniumWD, playwrightWD } from 'promod';

const { ENGINE } = process.env;

const engine = ENGINE === 'pw' ? playwrightWD : seleniumWD;

const { browser, $, $$ } = engine;

export { engine, browser, $, $$ };
