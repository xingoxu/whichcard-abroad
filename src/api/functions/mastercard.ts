import axios from 'axios';
import {
  format,
  subDays,
  isSameDay
} from 'date-fns';
import { storeResult } from '../utils/database';
import { GetCurrencyFunction } from '@/api/utils/types';
import { asyncOnce } from '../utils/asyncOnce';

const mastercardCurrencyResponseExample = {
  name: 'settlement-conversion-rate',
  description:
    'Settlement conversion rate and billing amount',
  date: '2020-05-19 12:01:35',
  data: {
    conversionRate: 107.5,
    crdhldBillAmt: 107.5,
    fxDate: '2020-05-18',
    transCurr: 'USD',
    crdhldBillCurr: 'JPY',
    transAmt: 1,
    bankFee: 0
  }
};

const mastercardCurrencyErrorResponseExample = {
  name: 'settlement-conversion-rate',
  description:
    'An error occurred during the request',
  date: '2020-05-19 13:18:18',
  type: 'error',
  data: {
    errorCode: '104',
    errorMessage:
      'Not Found , The calculated cross rates for the selected date is not available.'
  }
};

type MastercardCurrencyResponse =
  | typeof mastercardCurrencyResponseExample
  | typeof mastercardCurrencyErrorResponseExample;

const isErrorResponse = (
  responseData: MastercardCurrencyResponse
): responseData is typeof mastercardCurrencyErrorResponseExample => {
  return (
    (responseData as typeof mastercardCurrencyErrorResponseExample)
      .type === 'error'
  );
};

const _getMastercardCurrency: GetCurrencyFunction = async ({
  transCurr,
  billCurr,
  date
}) => {
  const { data } = await axios.get<
    MastercardCurrencyResponse
  >(
    `https://www.mastercard.us/settlement/currencyrate/fxDate=${format(
      isSameDay(new Date(), date)
        ? subDays(date, 1)
        : date,
      'yyyy-MM-dd'
    )};transCurr=${transCurr};crdhldBillCurr=${billCurr};bankFee=0;transAmt=1/conversion-rate`,
    {
      headers: {
        Referer:
          'https://www.mastercard.us/en-us/personal/get-support/convert-currency.html',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
      }
    }
  );
  if (isErrorResponse(data))
    throw new Error(
      `Can't get Mastercard currency.`
    );
  else {
    const result = String(
      data.data.conversionRate
    );
    storeResult({
      transCurr,
      billCurr,
      date,
      result,
      brand: 'mastercard'
    }).catch(console.error);
    return result;
  }
};

const getMastercardCurrency = asyncOnce<
  typeof _getMastercardCurrency
>(_getMastercardCurrency);

export { getMastercardCurrency };
