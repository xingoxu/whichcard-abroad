import { IncomingMessage } from 'http';
import url from 'url';
import { createError } from '../utils/createError';
import {
  SupportedCurrency,
  SupportedCurrencyKey
} from '../../constants/SupportedCurrency';
import { parse } from 'qs';
import {
  BrandCurrency,
  Brand,
  Brands
} from '../../constants/cards';
import { GetCurrencyFunction } from '../utils/types';
import { queryFromCache } from '../utils/database';
import { getVisaCurrency } from './visa';
import { getMastercardCurrency } from './mastercard';
import { getJCBCurrency } from './jcb';

const getCurrencyFunctionMapping: {
  [key in Brand]?: GetCurrencyFunction;
} = {
  visa: getVisaCurrency,
  mastercard: getMastercardCurrency,
  jcb: getJCBCurrency
};

export const response = async (
  request: IncomingMessage
): Promise<Partial<BrandCurrency>> => {
  const _url = url.parse(request.url!);

  const transCurr =
    parse(_url.query ?? '')['ccy'] || 'USD';

  if (typeof transCurr !== 'string')
    throw createError(400);

  if (
    !Object.keys(SupportedCurrency).includes(
      transCurr
    )
  ) {
    throw createError(
      400,
      'This Currency is not available now.'
    );
  }

  let billCurr: SupportedCurrencyKey = 'JPY';

  if (transCurr === billCurr)
    throw createError(
      400,
      'Transfer currency is the same as billing currency.'
    );

  let date = new Date();

  const cacheResult = await queryFromCache(
    date
  );

  const promises = Brands.map(
    async (key: Brand) => {
      let _transCurr = transCurr as SupportedCurrencyKey;
      if (
        cacheResult &&
        cacheResult![key] &&
        cacheResult![key]![_transCurr] &&
        cacheResult![key]![_transCurr]![
          billCurr
        ]
      ) {
        return cacheResult![key]![
          _transCurr
        ]![billCurr]!;
      }
      return (
        (await getCurrencyFunctionMapping[
          key
        ]) &&
        getCurrencyFunctionMapping[key]!({
          transCurr: _transCurr,
          billCurr,
          date
        })
      );
    }
  );

  const getValue = (
    promiseResult: PromiseSettledResult<
      string | undefined
    >
  ) =>
    (promiseResult.status === 'fulfilled' &&
      promiseResult.value) ||
    undefined;

  return await Promise.allSettled(promises)
    .then(results => results.map(getValue))
    .then(([visa, mastercard, jcb, ae]) => ({
      visa,
      mastercard,
      jcb,
      ae
    }));
};
