import { ChakraProvider, Box, Grid, theme, HStack } from "@chakra-ui/react";
import { DominanceMap } from "./components/DominanceMap";
import { DominanceTable } from "./components/DominanceTable";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { csv } from "d3-fetch";
import { useState, useEffect } from "react";
import { CryptoMode } from "./utils/modes";

export const App = () => {
  const [mode, setMode] = useState<CryptoMode>("btc");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    csv("/2023-07-04.csv").then((data) => {
      setData(data);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Header mode={mode} setMode={setMode} />
          <HStack w="100%" h="100vh" pr={15}>
            <DominanceMap data={data} mode={mode} />
            <DominanceTable data={data} />
          </HStack>
        </Grid>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};
