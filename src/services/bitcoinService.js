import axios from 'axios';
import {storageService} from './storageService.js';

export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransactions,
};

const RATE_KEY = 'rates';
const MARKET_KEY = 'prices';
const TRADES_KEY = 'trades';
//https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true

async function getRate(coins) {
  let rates = storageService.load(RATE_KEY);
  if (!rates || !rates[coins]) {
    console.log('no storage');
    rates = {};
    const res = await axios.get(
      `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    );
    rates[coins] = res.data;
  }
  storageService.store(RATE_KEY, rates);
  console.log(rates);
  return rates;
}

async function getMarketPrice(months) {
  let prices = storageService.load(MARKET_KEY);
  if (!prices || !prices[months]) {
    console.log('no storage');
    prices = {};
    const res = await axios.get(
      `https://api.blockchain.info/charts/market-price?timespan=${months}months&format=json&cors=true`
    );
    prices[months] = res.data;
  }
  storageService.store(MARKET_KEY, prices);
  console.log(prices);
  return prices;
}

// `ex {5: {…}} res
// 5:
// description: "Average USD market price across major bitcoin exchanges."
// name: "Market Price (USD)"
// period: "day"
// status: "ok"
// unit: "USD"
// values: [{},{}...]`

async function getConfirmedTransactions(months) {
  // saving the api data in storage, prevent api block
  // maybe change to day
  let trades = storageService.load(TRADES_KEY);
  if (!trades || !trades[months]) {
    console.log('no storage');
    trades = {};
    const res = await axios.get(
      `https://api.blockchain.info/charts/trade-volume?timespan=${months}months&format=json&cors=true`
    );
    console.log(res);
    trades[months] = res.data;
  }
  storageService.store(TRADES_KEY, trades);
  console.log(trades);
  return trades;
}
