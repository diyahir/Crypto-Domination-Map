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
