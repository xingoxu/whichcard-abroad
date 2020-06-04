import { SupportedCurrencyKey } from "~/constants/SupportedCurrency";

export type GetCurrencyFunction = (params: {
  transCurr: SupportedCurrencyKey;
  billCurr: SupportedCurrencyKey;
  date: Date;
}) => Promise<string | undefined>;