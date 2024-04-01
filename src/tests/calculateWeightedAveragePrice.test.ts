import { calculateWeightedAveragePrice } from '../utils/calculateWeightedAveragePrice';

describe('calculateWeightedAveragePrice', () => {
  it('calculates the correct average price for various bid volume combinations', () => {
    // Test with various bid volume combinations
    const volume = 25;
    const bids = [
      { price: 100, volume: 10 },
      { price: 200, volume: 15 },
    ];

    const averagePrice = calculateWeightedAveragePrice(volume, bids);

    expect(averagePrice).toBeCloseTo(150, 1);

  });
});