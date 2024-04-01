import { calculateWeightedAveragePrice } from '../utils/calculateWeightedAveragePrice';

describe('calculateWeightedAveragePrice', () => {
  it('calculates the correct average price for various bid volume combinations', () => {
    // Test with various bid volume combinations
    const volume = 25;
    const bids = [
      { p: 100, s: 10 },
      { p: 200, s: 15 },
    ];

    const averagePrice = calculateWeightedAveragePrice(volume, bids);

    expect(averagePrice).toBeCloseTo(150, 1);

  });
});