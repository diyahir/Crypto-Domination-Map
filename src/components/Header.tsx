import { Code, HStack, Spacer, Text } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { parseLargeNumber } from "../utils/formating";

export const Header = () => {
  const fdv = 31000 * 21e6;
  return (
    <HStack w="100%" pr={15}>
      <Text fontSize={"2xl"}>
        <Code fontSize={"xl"}>
          Bitcoin Dominance at $31,000 - FDV ${parseLargeNumber(fdv.toString())}
        </Code>
      </Text>
      <Spacer />
      <ColorModeSwitcher justifySelf="flex-end" mr={"40px"} />
    </HStack>
  );
};
