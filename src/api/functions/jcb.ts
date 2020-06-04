import axios from 'axios';
import cheerio from 'cheerio';
import { storeResult } from '../utils/database';
import { GetCurrencyFunction } from '../utils/types';

const getJCBCurrency: GetCurrencyFunction = async ({
  transCurr,
  billCurr,
  date
}) => {
  const { data: htmlBody } = await axios.get<
    string
  >(`https://www.jcb.jp/rate/jpy.html`);
  const $ = cheerio.load(htmlBody);
  const $targetDOM = $(
    '.rateTableArea tbody tr'
  );
  const result = $targetDOM
    .filter((_index, element) => {
      let ccy = $(element)
        .children('td')
        .eq(0)
        .text();
      return ccy === transCurr;
    })
    .eq(0)
    .text()
    .match(/[\d\.]+/g);
  if (result && result[0]) {
    storeResult({
      transCurr,
      billCurr,
      date,
      result: result[0],
      brand: 'jcb'
    }).catch(console.error);
    return result[0];
  } else {
    return '';
  }
};

export { getJCBCurrency };
