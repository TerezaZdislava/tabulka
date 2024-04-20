const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newItem = () => {
  const paymentChance = Math.random();
  return {
    productName: (Math.random() + 1).toString(36).substring(7),
    market: paymentChance > 0.66 ? 'yes' : 'no',
    payment:
      paymentChance > 0.66
        ? 'paid'
        : paymentChance > 0.33
        ? 'unpaid'
        : 'not found',
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newItem(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
