export const calculateWeightedAveragePrice = (volume: number, bids: any[]) => {
  let totalVolume = 0;
  let weightedPriceSum: number = 0;

  for (const bid of bids) {
    const bidPriceNumber = Number(bid.p); 
    const bidVolumeNumber = Number(bid.s); 

    if (isNaN(bidPriceNumber) || isNaN(bidVolumeNumber)) {
      console.error("Invalid bid data: price or volume is not a number", bid);
      continue; // Skip this bid if data is invalid
    }

    const volumeContribution = Number.isFinite(Math.min(bidVolumeNumber, volume - totalVolume)) ? Math.min(bidVolumeNumber, volume - totalVolume) : 0;
    weightedPriceSum += bidPriceNumber * volumeContribution;
    totalVolume += volumeContribution;
  }

  return totalVolume > 0 ? parseFloat((weightedPriceSum / totalVolume).toFixed(2)) : null;


};
