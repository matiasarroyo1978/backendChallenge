import { calculateWeightedAveragePrice } from '../utils/calculateWeightedAveragePrice';
const sdk = require("api")("@testalpacadocs/v1.1#o5zb113ltn3vvix");

export const getAveragePrice = async (volume: number, symbols: string) => {
  const { data } = await sdk.cryptoLatestOrderbooks({ loc: "us", symbols });
  if (!data.orderbooks[symbols]) {
    throw new Error(`No data available for symbol ${symbols}`);
  }

  const bids = data.orderbooks[symbols].b;

  // Si el par es ETH/USD, convertir el volumen de ETH a USD
  if (symbols === 'ETH/USD') {
    const ethPrice = Number(bids[0].p); // Asume que el primer bid tiene el precio más reciente
    volume /= ethPrice;
    console.log("ETH volume in Dollars: ",volume);
  }

  return calculateWeightedAveragePrice(volume, bids);
};
