import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { parseLargeNumber } from "../utils/formating";

export const DominanceTable = ({ data }: { data: any[] }) => {
  const [bitcoinRanking, setBitcoinRanking] = useState<number>(0);

  useEffect(() => {
    setBitcoinRanking(findBitcoinRanking());
  }, [data]);

  const BTC_FDV = 31000 * 21e6;

  function findBitcoinRanking() {
    let ranking = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]["eUSD"] < BTC_FDV) {
        ranking = i + 1;
        break;
      }
    }
    return ranking;
  }

  return (
    <Table size={"md"} width={"30%"} variant="simple">
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
          if (ind === bitcoinRanking - 2) {
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
        <Tr color={"orange"}>
          <Th color={"orange"}>{bitcoinRanking}</Th>
          <Th color={"orange"}>{"Bitcoin"}</Th>
          <Th color={"orange"}>{"BTC"}</Th>
          <Th color={"orange"}>{"$" + parseLargeNumber(BTC_FDV.toString())}</Th>
        </Tr>

        {data.map((row, ind) => {
          if (ind < bitcoinRanking + 3 && ind >= bitcoinRanking) {
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
