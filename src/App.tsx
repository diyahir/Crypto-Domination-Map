import {
  ChakraProvider,
  Box,
  Grid,
  HStack,
  extendTheme,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { DominanceMap } from "./components/DominanceMap";
import { DominanceTable } from "./components/DominanceTable";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { csv } from "d3-fetch";
import { useState, useEffect } from "react";
import { CryptoMode } from "./utils/modes";

export const App = () => {
  const [mode, setMode] = useState<CryptoMode>("both");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    csv("/2023-07-04.csv").then((data) => {
      setData(data);
    });
  }, []);

  const theme = extendTheme({
    config: {
      useSystemColorMode: true,
      initialColorMode: "dark",
    },
  });

  // background: #141E30;  /* fallback for old browsers */
  // background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  return (
    <ChakraProvider theme={theme}>
      <Box
        textAlign="center"
        fontSize="xl"
        background={useColorModeValue(
          "",
          "linear-gradient(to right, #243B55, #141E30)"
        )}
      >
        <Header mode={mode} setMode={setMode} />
        <Grid minH="100vh" p={3} templateColumns={"repeat(3, 1fr)"}>
          <GridItem colSpan={[3, 3, 3, 2]}>
            <DominanceMap data={data} mode={mode} />
          </GridItem>
          <GridItem colSpan={[3, 3, 3, 1]} overflow={"scroll"}>
            <DominanceTable data={data} mode={mode} />
          </GridItem>
        </Grid>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};
