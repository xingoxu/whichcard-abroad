import express from 'express';
import * as middlewares from './src/api';
import { createError } from './src/api/utils/createError';
const asyncify = require('express-asyncify');
const { Nuxt } = require('nuxt');

const nuxtConfig = require('./nuxt.config');

const IS_PROD =
  process.env.NODE_ENV === 'production';

const nuxt = new Nuxt({
  ...nuxtConfig,
  dev: !IS_PROD
});

let isNuxtReady = false;

const app = asyncify(express());

app.use(
  '/static',
  express.static('./static')
);

type middlewareKey = keyof typeof middlewares;

for (const key in middlewares) {
  let _key = key as middlewareKey;
  app.use(middlewares[_key]);
}

app.use(
  async (
    req: express.Request,
    res: express.Response
  ) =>
    (isNuxtReady ||
      ((await nuxt.ready()) &&
        (isNuxtReady = true))) &&
    nuxt.render(req, res)
);

let errorHandler: express.ErrorRequestHandler = (
  err: ReturnType<typeof createError>,
  _req,
  res,
  _next
) => {
  console.log(err);
  res.status(err.statusCode).json({
    message: err.message,
    stack: err.stack
  });
};
app.use(errorHandler);

export { app, nuxt };
