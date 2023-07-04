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
import {
  getCurrencyTitle,
  getCurrencyValue,
  getFDV,
  parseLargeNumber,
} from "../utils/formating";
import { CryptoMode } from "../utils/modes";
import { useEffect, useState } from "react";

export const Header = ({
  mode,
  setMode,
}: {
  mode: CryptoMode;
  setMode: (m: CryptoMode) => void;
}) => {
  const [value, setValue] = useState("both");

  useEffect(() => {
    setMode(value as CryptoMode);
  }, [value, setMode]);
  return (
    <HStack w="100%" pr={15}>
      <Text fontSize={"2xl"}>
        <Code fontSize={"xl"}>
          {getCurrencyTitle(mode)}
          {mode !== "both"
            ? " Dominance at $" + getCurrencyValue(mode).toString()
            : ""}{" "}
          - FDV ${parseLargeNumber(getFDV(mode).toString())}
        </Code>
      </Text>

      <Spacer />
      <RadioGroup defaultValue={value} value={value} onChange={setValue}>
        <Stack spacing={4} direction="row">
          <Radio value="both">Both 🤝</Radio>
          <Radio colorScheme="orange" value="btc">
            Bitcoin
          </Radio>
          <Radio colorScheme="purple" value="eth">
            Ethereum
          </Radio>
        </Stack>
      </RadioGroup>
      <ColorModeSwitcher justifySelf="flex-end" mr={"40px"} />
    </HStack>
  );
};
