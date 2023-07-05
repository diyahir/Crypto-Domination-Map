import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip, Text } from "@chakra-ui/react";
import { getCurrencyTitle, getFDV, parseLargeNumber } from "../utils/formating";
import { STYLES_MAP } from "./styles/DominanceMap";
import { CryptoMode } from "../utils/modes";
import { useState, useEffect } from "react";

export const DominanceMap = ({
  data,
  mode,
}: {
  data: any[];
  mode: CryptoMode;
}) => {
  var geographyMode = "Less than Bitcoin";

  if (mode === "btc") {
    geographyMode = "Less than Bitcoin";
  } else if (mode === "eth") {
    geographyMode = "Less than ETH";
  } else if (mode === "both") {
    geographyMode = "Less than Combined";
  }

  function getFillByMode(m: CryptoMode) {
    if (m === "btc") {
      return STYLES_MAP.lessThanBitcoin;
    } else if (m === "eth") {
      return STYLES_MAP.lessThanEthereum;
    } else if (m === "both") {
      return STYLES_MAP.lessThanBoth;
    }
  }

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
    <>
      <Text
        fontWeight={"bold"}
        fontFamily={"IBM PLEX MONO"}
        position={"relative"}
        fontSize={"md"}
        top={22}
      >
        {data.length - ranking}/{data.length} countries with a Money Supply(M2)
        less than {getCurrencyTitle(mode)}
      </Text>
      <ComposableMap
        projectionConfig={{
          center: [15, 0],
        }}
      >
        <Geographies geography={"geographies.json"}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // ignore antartica
              if (geo.id === "ATA") {
                return null;
              }
              const d = data.find((s) => s.ISO === geo.id);
              const existsAndLessThanBitcoin = d && d[geographyMode] === "True";

              if (!d) {
                return (
                  <Tooltip
                    label={`No data for ${geo.properties.name}`}
                    key={geo.rsmKey}
                  >
                    <Geography
                      data-tip={geo.properties.NAME}
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: STYLES_MAP.missing,
                        hover: STYLES_MAP.hover,
                        pressed: STYLES_MAP.pressed,
                      }}
                    />
                  </Tooltip>
                );
              }

              if (existsAndLessThanBitcoin) {
                return (
                  <Tooltip
                    label={`${geo.properties.name} M2: $${parseLargeNumber(
                      d["eUSD"],
                      true
                    )}`}
                    key={geo.rsmKey}
                  >
                    <Geography
                      data-tip={`No data`}
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: getFillByMode(mode),
                        hover: STYLES_MAP.lessThanBitcoinHover,
                        pressed: STYLES_MAP.pressed,
                      }}
                    />
                  </Tooltip>
                );
              } else {
                return (
                  <Tooltip
                    label={`${geo.properties.name} M2: $${parseLargeNumber(
                      d["eUSD"],
                      true
                    )}`}
                    key={geo.rsmKey}
                  >
                    <Geography
                      data-tip={`No data`}
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: STYLES_MAP.default,
                        hover: STYLES_MAP.hover,
                        pressed: STYLES_MAP.pressed,
                      }}
                    />
                  </Tooltip>
                );
              }
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};
