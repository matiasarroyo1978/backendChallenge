import { calculateWeightedAveragePrice } from '../utils/calculateWeightedAveragePrice';

describe('calculateWeightedAveragePrice', () => {
  it('calculates the correct average price for various bid volume combinations', () => {
    // Test with various bid volume combinations
    const volume = 25;
    const bids = [
      { p: 100, s: 10 },
      { p: 200, s: 15 },
    ];

    console.log('Input volume:', volume);
    console.log('Input bids:', bids);

    const averagePrice = calculateWeightedAveragePrice(volume, bids);

    console.log('Calculated averagePrice:', averagePrice);

    expect(averagePrice).toBeCloseTo(150, 1);
  });
});
