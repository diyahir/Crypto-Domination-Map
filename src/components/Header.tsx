import {
  Code,
  HStack,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { parseLargeNumber } from "../utils/formating";
import { CryptoMode } from "../utils/modes";
import { useEffect, useState } from "react";

export const Header = ({
  mode,
  setMode,
}: {
  mode: CryptoMode;
  setMode: (m: CryptoMode) => void;
}) => {
  const [value, setValue] = useState("btc");
  const fdv = 31000 * 21e6;
  useEffect(() => {
    setMode(value as CryptoMode);
  }, [value, setMode]);
  return (
    <HStack w="100%" pr={15}>
      <Text fontSize={"2xl"}>
        <Code fontSize={"xl"}>
          Bitcoin Dominance at $31,000 - FDV ${parseLargeNumber(fdv.toString())}
        </Code>
      </Text>

      <Spacer />
      <RadioGroup defaultValue={value} value={value} onChange={setValue}>
        <Stack spacing={4} direction="row">
          <Radio colorScheme="orange" value="btc">
            Bitcoin
          </Radio>
          <Radio colorScheme="purple" value="eth">
            Ethereum
          </Radio>
          <Radio value="both">Both 🤝</Radio>
        </Stack>
      </RadioGroup>
      <ColorModeSwitcher justifySelf="flex-end" mr={"40px"} />
    </HStack>
  );
};
