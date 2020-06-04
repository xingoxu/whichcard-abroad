export const SupportedCurrency = {
  USD: '🇺🇸',
  CNY: '🇨🇳',
  HKD: '🇭🇰',
  TWD: '🇹🇼',
  KRW: '🇰🇷',
  JPY: '🇯🇵'
};

export type SupportedCurrencyKey = keyof typeof SupportedCurrency;

export type SupportedCurrencyFrontend = Omit<
  typeof SupportedCurrency,
  'JPY'
>;
