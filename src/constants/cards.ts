export const Brands = [
  'visa',
  'mastercard',
  'jcb',
  'ae'
] as const;

export type Brand = typeof Brands[number];

export type BrandCurrency = {
  [key in Brand]: string;
};

export type Card = {
  id: number;
  name: string;
  brand: Brand;
  markupFee: number;
  rewardRate: number;
  rewardCalc?: (value: number) => number;
  markupFeeCaption?: string;
  rewardCaption?: string;
};

export type ShowCard = {
  card: Card;
  index: number;
  calc: string | number;
  reward: number;
  calcWithReward: string | number;
};

const rewardWithRewardCalc = (
  rewardRate: number,
  value: number
) => {
  let result = 0;
  while (value !== 0) {
    value = Math.floor(
      (value * rewardRate) / 100
    );
    result += value;
  }
  return result;
};

const rewardWithoutRewardCalc = (
  rewardRate: number,
  value: number
) => Math.floor((value * rewardRate) / 100);

export function rewardWithReward(
  this: Card,
  value: number
) {
  return rewardWithRewardCalc(
    this.rewardRate,
    value
  );
}

export function rewardWithoutReward(
  this: Card,
  value: number
) {
  return rewardWithoutRewardCalc(
    this.rewardRate,
    value
  );
}

export const cards: Card[] = [
  {
    name: 'Visa LINE Payクレジットカード',
    brand: 'visa',
    markupFee: 2.2,
    rewardRate: 3,
    rewardCalc: rewardWithoutReward
  },
  {
    name: '三井住友デビュープラスカード',
    brand: 'visa',
    markupFee: 2.2,
    rewardRate: 1,
    rewardCalc: rewardWithoutReward
  },
  {
    name: 'Kyash',
    brand: 'visa',
    markupFee: 3,
    rewardRate: 1,
    rewardCalc: rewardWithReward
  },
  {
    name: '楽天カード（Mastercard）',
    brand: 'mastercard',
    markupFee: 1.63,
    rewardRate: 1,
    rewardCalc: rewardWithReward
  },
  {
    name: '楽天カード（Visa）',
    brand: 'visa',
    markupFee: 1.63,
    rewardRate: 1,
    rewardCalc: rewardWithReward
  },
  {
    name: '楽天カード（JCB）',
    brand: 'jcb',
    markupFee: 1.6,
    rewardRate: 1,
    rewardCalc: rewardWithReward
  },
  {
    name: 'セゾンカード（American Express）',
    brand: 'ae',
    markupFee: 2,
    rewardRate: 1,
    rewardCalc: rewardWithoutReward
  }
].map((card, index) => {
  (card as Card).id = index;
  return card as Card;
});
