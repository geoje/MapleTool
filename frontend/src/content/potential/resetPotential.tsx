import {
  Badge,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { AnimatedCounter } from "react-animated-counter";
import { useAppSelector } from "../../reducer/hooks";
import { useState } from "react";

export default function ResetPotential({ itemIndex }: { itemIndex: number }) {
  const inventory = useAppSelector((state) => state.user.inventory);
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const [meso, setMeso] = useState(0);

  const item = inventory[itemIndex];

  return (
    <Stack minW={44}>
      <Flex
        p={4}
        bgColor={dark ? "gray.800" : "gray.50"}
        borderRadius={8}
        justify="center"
        align="center"
      >
        <IconButton
          aria-label="item"
          size="lg"
          variant="none"
          backgroundColor={dark ? "gray.700" : "gray.200"}
          borderWidth={1}
          borderColor={dark ? "gray.400" : "gray.600"}
          borderStyle="dashed"
          icon={
            <Image
              src={item?.item_icon}
              style={{ imageRendering: "pixelated" }}
            />
          }
        />
      </Flex>
      <OptionsButton
        grade={item?.potential_option_grade}
        options={[
          item?.potential_option_1,
          item?.potential_option_2,
          item?.potential_option_3,
        ]}
      />
      <OptionsButton
        grade={item?.potential_option_grade}
        options={[
          item?.potential_option_1,
          item?.potential_option_2,
          item?.potential_option_3,
        ]}
      />
      <Flex
        justifyContent="space-between"
        bgColor={dark ? "gray.800" : "gray.50"}
        borderRadius={8}
      >
        <Text fontSize={12}>40,000,000 메소</Text>
      </Flex>
      <Button size="xs" onClick={() => setMeso(meso + 40000000)}>
        한 번 더 재설정하기
      </Button>
      <AnimatedCounter
        includeDecimals={false}
        incrementColor="black"
        includeCommas
        fontSize="16px"
        value={meso}
      />
    </Stack>
  );
}

function OptionsButton({
  grade,
  options,
}: {
  grade: string;
  options: string[];
}) {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <Button
      h="auto"
      p={1}
      flexDir="column"
      alignItems="stretch"
      textAlign="start"
    >
      <Flex justify="space-between" mb={1}>
        <Heading pl={1} fontSize={12}>
          BEFORE
        </Heading>
        <Badge px={1} variant="solid" colorScheme="orange" borderRadius={4}>
          선택
        </Badge>
      </Flex>
      <Stack
        pb={1}
        gap={0}
        borderRadius={4}
        backgroundColor={dark ? "gray.700" : "gray.300"}
      >
        <Text
          mb={1}
          fontSize={12}
          textAlign="center"
          borderTopRadius={4}
          backgroundColor={dark ? "gray.800" : "gray.400"}
        >
          {grade}
        </Text>
        <Text px={2} fontSize={12}>
          {options[0]}
        </Text>
        <Text px={2} fontSize={12}>
          {options[1]}
        </Text>
        <Text px={2} fontSize={12}>
          {options[2]}
        </Text>
      </Stack>
    </Button>
  );
}
