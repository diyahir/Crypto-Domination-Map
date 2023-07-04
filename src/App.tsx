import { ChakraProvider, Box, Grid, theme, HStack } from "@chakra-ui/react";
import { DominanceMap } from "./components/DominanceMap";
import { DominanceTable } from "./components/DominanceTable";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Header />
          <HStack w="100%" h="100vh" pr={15}>
            <DominanceMap />
            <DominanceTable />
          </HStack>
        </Grid>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};
