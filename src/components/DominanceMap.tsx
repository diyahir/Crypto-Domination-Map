import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "@chakra-ui/react";
import { parseLargeNumber } from "../utils/formating";
import { STYLES_MAP } from "./styles/DominanceMap";
import { CryptoMode } from "../utils/modes";

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

  return (
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
  );
};
