import axios from 'axios';
import cheerio from 'cheerio';
import { format } from 'date-fns';
import { storeResult } from '../utils/database';
import { GetCurrencyFunction } from '../utils/types';
import { asyncOnce } from '../utils/asyncOnce';

const _getVisaCurrency: GetCurrencyFunction = async ({
  transCurr,
  billCurr,
  date
}) => {
  const { data: htmlBody } = await axios.get<
    string
  >(
    `https://usa.visa.com/support/consumer/travel-support/exchange-rate-calculator.html`,
    {
      params: {
        amount: 1,
        fee: '0.0',
        utcConvertedDate: '',
        exchangedate: format(
          date,
          'MM/dd/yyyy'
        ),
        fromCurr: billCurr,
        toCurr: transCurr,
        submitButton:
          'Calculate exchange rate'
      }
    }
  );
  const $ = cheerio.load(htmlBody);
  const $targetDOM = $(
    '.converted-amount-value'
  );
  const result = $targetDOM
    .eq($targetDOM.length - 2)
    .text()
    .match(/^\d+\.\d+/)![0];

  storeResult({
    transCurr,
    billCurr,
    date,
    result,
    brand: 'visa'
  }).catch(console.error);
  return result;
};

const getVisaCurrency = asyncOnce<
  typeof _getVisaCurrency
>(_getVisaCurrency);

export { getVisaCurrency };
