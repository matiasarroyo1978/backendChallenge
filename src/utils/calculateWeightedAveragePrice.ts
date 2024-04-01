export const calculateWeightedAveragePrice = (volume: number, bids: any[]) => {
  let totalVolume = 0;
  let weightedPriceSum = 0;
  const EPSILON = 2.2250738585072014e-32; 
  for (const bid of bids) {
    const bidPrice = Number(bid.p); 
    const bidVolume = Number(bid.s); 
    console.log(bidPrice, bidVolume); 
    if (isNaN(bidPrice) || isNaN(bidVolume)) {
      console.error("Invalid bid data: price or volume is not a number", bid);
      continue; // Skip this bid if data is invalid
    }

    console.log(`Current bid: price = ${bidPrice}, volume = ${bidVolume}`);

    const volumeContribution = Math.min(bidVolume, volume - totalVolume + EPSILON);
    weightedPriceSum += bidPrice * volumeContribution;
    totalVolume += volumeContribution; 


    console.log(`After calculations: total_volume = ${totalVolume}, weighted_price_sum = ${weightedPriceSum}`);
    console.log('--------------------');
  }

  return totalVolume > 0 ? weightedPriceSum / totalVolume : null;
};