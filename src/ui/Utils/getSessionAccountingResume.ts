export const getSessionAccountingResume = (players, price) => {
  const playersHavePaid = Object.entries(players)
    .map(([, value]) => value)
    .filter(val => val).length;

  const unitiPrice = price / Object.keys(players).length;

  const sessionAccountingBalance = unitiPrice * playersHavePaid;

  return price - sessionAccountingBalance;
};
