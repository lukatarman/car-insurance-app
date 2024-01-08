export const getDecimalValue = (number: number, decimals: number = 1) => {
  return parseFloat(number.toFixed(decimals));
};

export const addValues = (values: number[]): number => {
  return values.reduce((prev, curr) => prev + curr);
};

export const getPercentageOf = (whole: number, part: number) => {
  return (part / Math.abs(whole)) * 100;
};

export const adjustValuesProportionally = (prices: number[], totalAmount: number) => {
  const totalExistingCost = addValues(prices);

  return prices.map((price) => {
    if (price === 0) return 0;

    return price + totalAmount * 0.01 * getPercentageOf(totalExistingCost, price);
  });
};
