import dotenv from 'dotenv';

const IS_PROD =
  process.env.NODE_ENV === 'production';
const STAGE_PROD =
  process.env.STAGE === 'production';
const PORT = IS_PROD ? 80 : 3000;

dotenv.config({
  path: `./src/.env.${
    STAGE_PROD ? 'production' : 'development'
  }`
});

const { Builder } = require('nuxt');
const { app, nuxt } = require('./app');

(async function main() {
  if (!IS_PROD) {
    await nuxt.ready();
    await new Builder(nuxt).build();
  }

  app.listen(PORT);
})();
