import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  getCurrencyColor,
  getCurrencyTicker,
  getCurrencyTitle,
  getFDV,
  parseLargeNumber,
} from "../utils/formating";
import { CryptoMode } from "../utils/modes";

export const DominanceTable = ({
  data,
  mode,
}: {
  data: any[];
  mode: CryptoMode;
}) => {
  const [ranking, setRanking] = useState<number>(0);

  function findranking() {
    let ranking = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]["eUSD"] < getFDV(mode)) {
        ranking = i + 1;
        break;
      }
    }
    return ranking;
  }

  useEffect(() => {
    setRanking(findranking());
  }, [data, mode]);

  return (
    <Table size={["sm", "sm", "sm", "md"]} variant="simple">
      <Thead>
        <Tr>
          <Th>Rank</Th>
          <Th>Country</Th>
          <Th>Currency</Th>
          <Th>Market Cap</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, ind) => {
          if (ind < 10) {
            if (row["Country"] === "Zimbabwe") {
              return (
                <Tr key={ind}>
                  <Th>{ind + 1}</Th>
                  <Th>{row["Country"] + "*"}</Th>
                  <Th>{row["Ticker"] + "*"}</Th>
                  <Th>{"$" + parseLargeNumber(row["eUSD"]) + "*"}</Th>
                </Tr>
              );
            }
            return (
              <Tr key={ind}>
                <Th>{ind + 1}</Th>
                <Th>{row["Country"]}</Th>
                <Th>{row["Ticker"]}</Th>
                <Th>{"$" + parseLargeNumber(row["eUSD"])}</Th>
              </Tr>
            );
          }
          return null;
        })}
        <Tr>
          <Th colSpan={4}>...</Th>
        </Tr>
        {data.map((row, ind) => {
          if (ind === ranking - 2) {
            return (
              <Tr key={ind}>
                <Th>{ind + 1}</Th>
                <Th>{row["Country"]}</Th>
                <Th>{row["Ticker"]}</Th>
                <Th>{"$" + parseLargeNumber(row["eUSD"])}</Th>
              </Tr>
            );
          }
          return null;
        })}
        <Tr color={getCurrencyColor(mode)}>
          <Th color={getCurrencyColor(mode)}>{ranking}</Th>
          <Th color={getCurrencyColor(mode)}>{getCurrencyTitle(mode)}</Th>
          <Th color={getCurrencyColor(mode)}>{getCurrencyTicker(mode)}</Th>
          <Th color={getCurrencyColor(mode)}>
            {"$" + parseLargeNumber(getFDV(mode).toString())}
          </Th>
        </Tr>

        {data.map((row, ind) => {
          if (ind < ranking + 3 && ind >= ranking) {
            return (
              <Tr key={ind}>
                <Th>{ind + 1}</Th>
                <Th>{row["Country"]}</Th>
                <Th>{row["Ticker"]}</Th>
                <Th>{"$" + parseLargeNumber(row["eUSD"])}</Th>
              </Tr>
            );
          }
          return null;
        })}
      </Tbody>
    </Table>
  );
};
