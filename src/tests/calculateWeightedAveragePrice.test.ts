import { calculateWeightedAveragePrice } from '../utils/calculateWeightedAveragePrice';

describe('calculateWeightedAveragePrice', () => {
  it('calculates the correct average price for various bid volume combinations', () => {
    // Test with various bid volume combinations
    const volume = 50;
    const bids = [
      { p: 100, s: 15 },
      { p: 200, s: 15 },
    ];

    const expectedAveragePrice = (bids[0].p * bids[0].s + bids[1].p * bids[1].s) / (bids[0].s + bids[1].s);
    const averagePrice = calculateWeightedAveragePrice(volume, bids);

    console.log('Expected Average Price:', expectedAveragePrice);
    console.log('Calculated Average Price:', averagePrice);

    expect(averagePrice).toBe(expectedAveragePrice); 
  });
});
