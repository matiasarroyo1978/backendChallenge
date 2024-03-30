"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sdk = require("api")("@testalpacadocs/v1.1#o5zb113ltn3vvix");
const app = (0, express_1.default)();
const port = 3000;
const apiKeyId = process.env.APCA_API_KEY_ID;
const apiSecretKey = process.env.APCA_API_SECRET_KEY;
console.log(apiKeyId, apiSecretKey);
if (!apiKeyId || !apiSecretKey) {
    console.error("API keys are not set.");
    process.exit(1);
}
app.get("/average-price", (req, res) => {
    console.log("Received request for /average-price");
    const volume = Number(req.query.volume);
    const symbols = req.query.symbols;
    console.log(`Volume: ${volume}, Symbols: ${symbols}`);
    if (!volume || !symbols) {
        console.error("Volume or symbols parameters are missing");
        return res.status(400).send("Volume and symbols parameters are required");
    }
    sdk
        .cryptoLatestOrderbooks({ loc: "us", symbols })
        .then(({ data }) => {
        console.log("API Response Data:", JSON.stringify(data, null, 2));
        const bids = data.orderbooks[symbols].b;
        let totalVolume = 0;
        let weightedPriceSum = 0;
        for (const bid of bids) {
            const bidPrice = Number(bid.p);
            const bidVolume = Number(bid.s);
            console.log(`Processing bid: price = ${bidPrice}, volume = ${bidVolume}`);
            if (totalVolume + bidVolume > volume) {
                const remainingVolume = volume - totalVolume;
                weightedPriceSum += bidPrice * remainingVolume;
                totalVolume += remainingVolume;
                console.log(`Adjusted Volume: ${remainingVolume}`);
                break;
            }
            else {
                totalVolume += bidVolume;
                weightedPriceSum += bidPrice * bidVolume;
            }
            console.log(`Accumulated totalVolume: ${totalVolume}, weightedPriceSum: ${weightedPriceSum}`);
        }
        console.log(`Final totalVolume: ${totalVolume}, weightedPriceSum: ${weightedPriceSum}`);
        const averagePrice = totalVolume > 0 ? weightedPriceSum / totalVolume : null;
        console.log(`Calculated averagePrice: ${averagePrice}`);
        res.send({ averagePrice });
    })
        .catch((err) => {
        console.error("Error fetching data from Alpaca:", err);
        res.status(500).send("Error fetching data from Alpaca");
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
