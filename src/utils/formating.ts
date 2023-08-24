import { CryptoMode } from "./modes";
const BTC_FDV = 26000 * 21e6;
const ETH_FDV = 1650 * 120e6;

export function parseLargeNumber(num: string, includeDecimals = false) {
  const numStr = num.replace(/,/g, "");
  let parsedNum = parseFloat(numStr) / 1e9;
  if (includeDecimals) {
    return parsedNum.toLocaleString() + "B";
  }
  return (
    parsedNum.toLocaleString(undefined, { maximumFractionDigits: 0 }) + "B"
  );
}

export function getCurrencyValue(mode: CryptoMode) {
  if (mode === "btc") {
    return BTC_FDV / 21e6;
  }
  if (mode === "eth") {
    return ETH_FDV / 120e6;
  }
  return BTC_FDV + ETH_FDV;
}

export function getFDV(mode: CryptoMode) {
  if (mode === "btc") {
    return BTC_FDV;
  }
  if (mode === "eth") {
    return ETH_FDV;
  }
  return BTC_FDV + ETH_FDV;
}

export function getCurrencyTitle(mode: CryptoMode) {
  if (mode === "btc") {
    return "Bitcoin";
  }
  if (mode === "eth") {
    return "Ethereum";
  }
  return "Bitcoin and Ethereum";
}

export function getCurrencyTicker(mode: CryptoMode) {
  if (mode === "btc") {
    return "BTC";
  }
  if (mode === "eth") {
    return "ETH";
  }
  return "BTC + ETH";
}

export function getCurrencyColor(mode: CryptoMode) {
  if (mode === "btc") {
    return "orange";
  }
  if (mode === "eth") {
    return "#647cf6";
  }
  return "#14acdc";
}
