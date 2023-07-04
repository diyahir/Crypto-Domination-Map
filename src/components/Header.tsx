import { Code, HStack, Spacer, Text } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

export const Header = () => {
  return (
    <HStack w="100%" pr={15}>
      <Text fontSize={"2xl"}>
        <Code fontSize={"xl"}>Bitcoin Dominance at $31,000</Code>
      </Text>
      <Spacer />
      <ColorModeSwitcher justifySelf="flex-end" mr={"40px"} />
    </HStack>
  );
};
