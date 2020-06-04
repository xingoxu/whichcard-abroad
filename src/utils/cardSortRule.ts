import {
  ShowCard,
  // rewardWithReward,
  rewardWithoutReward
} from '~/constants/cards';

export const showCardSort = (
  cardA: ShowCard,
  cardB: ShowCard
) => {
  if (
    typeof cardA.calcWithReward ===
      'string' &&
    typeof cardB.calcWithReward === 'string'
  )
    return 0;

  if (
    typeof cardA.calcWithReward === 'string'
  )
    return 1;

  if (
    typeof cardB.calcWithReward === 'string'
  )
    return -1;

  if (
    cardA.calcWithReward !==
    cardB.calcWithReward
  )
    return (
      cardA.calcWithReward -
      cardB.calcWithReward
    );

  if (
    cardA.card.rewardCalc !==
    cardB.card.rewardCalc
  )
    return cardA.card.rewardCalc !==
      rewardWithoutReward
      ? -1
      : 1;

  return 0;
};
