import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { csv } from "d3-fetch";
import { Tooltip } from "@chakra-ui/react";
import { parseLargeNumber } from "../utils/formating";

export const STYLES_MAP = {
  default: {
    fill: "#ECEFF1",
    stroke: "#607D8B",
    strokeWidth: 0.5,
    outline: "none",
  },
  missing: {
    fill: "gray",
    stroke: "#607D8B",
    strokeWidth: 0.5,
    outline: "none",
  },
  lessThanBitcoin: {
    fill: "orange",
    stroke: "#607D8B",
    strokeWidth: 0.5,
    outline: "none",
  },
  lessThanBitcoinHover: {
    fill: "#8B4000",
    stroke: "#607D8B",
    strokeWidth: 0.5,
    outline: "none",
  },
  pressed: {
    fill: "#FF5722",
    stroke: "#607D8B",
    strokeWidth: 0.5,
    outline: "none",
  },
  hover: {
    fill: "#607D8B",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
};

export const DominanceMap = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    csv("/2023-07-04.csv").then((data) => {
      setData(data);
    });
  }, []);

  return (
    <ComposableMap>
      <Geographies geography={"geographies.json"}>
        {({ geographies }) =>
          geographies.map((geo) => {
            // ignore antartica
            if (geo.id === "ATA") {
              return null;
            }
            const d = data.find((s) => s.ISO === geo.id);
            const existsAndLessThanBitcoin =
              d && d["Less than Bitcoin"] === "True";

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
                      default: STYLES_MAP.lessThanBitcoin,
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
