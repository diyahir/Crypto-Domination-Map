import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box color="white">
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={4}
      >
        <Box flex="1 1 100%" mb={{ base: 4, md: 0 }}>
          <VStack>
            <Text fontSize="sm" color={"gray.500"}>
              Data from{" "}
              <Link
                href={
                  "https://tradingeconomics.com/country-list/money-supply-m2"
                }
              >
                Trading Economics
              </Link>{" "}
              and &nbsp;
              <Link href="https://finance.yahoo.com/currencies">
                Yahoo Finance
              </Link>
            </Text>
            <Text fontSize="sm" color={"gray.500"}>
              Donate:{" "}
              <Link href="https://etherscan.io/address/0x68b621079432B44EECf0cfaA09D81EB5e5239cF8">
                0x68b621079432B44EECf0cfaA09D81EB5e5239cF8
              </Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
