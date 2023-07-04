import { Box, Flex, Text } from "@chakra-ui/react";

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
          {/* <Flex justifyContent="center">
            <IconButton
              as="a"
              href="https://twitter.com/Fluid_Protocol"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              icon={<FaTwitter />}
              size="lg"
              variant="ghost"
              mx={2}
            />
            <IconButton
              as="a"
              href="https://github.com/example"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              icon={<FaGithub />}
              size="lg"
              variant="ghost"
              mx={2}
            />
            <IconButton
              as="a"
              href="https://discord.gg/qGteSSKb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              icon={<FaDiscord />}
              size="lg"
              variant="ghost"
              mx={2}
            />
          </Flex> */}
          <Text fontSize="sm">
            Data from tradingeconomics and yahoo finance
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
