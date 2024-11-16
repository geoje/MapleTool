import {
  AspectRatio,
  Box,
  Flex,
  ResponsiveValue,
  useColorMode,
} from "@chakra-ui/react";

export default function ItemSlot2({
  bgColorScheme,
  spec,
  w,
  children,
}: {
  bgColorScheme: "blue" | "purple";
  w?: ResponsiveValue<number | (string & {})>;
  spec?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const palette50 = dark ? ".900" : ".50";
  const palette200 = dark ? ".600" : ".200";
  const palette400 = dark ? ".500" : ".400";

  return (
    <AspectRatio
      as={Flex}
      ratio={1}
      w={w}
      flex={w ? undefined : 1}
      justify="center"
      align="center"
      bgColor={bgColorScheme + palette50}
      borderRadius={4}
    >
      <Box p={2}>
        <Flex
          w="100%"
          h="100%"
          borderWidth={bgColorScheme == "blue" ? 2 : undefined}
          borderStyle="dashed"
          borderRadius={2}
          borderColor={"gray" + palette400}
          justify="center"
          align="center"
        >
          {children}
          <Box
            position="absolute"
            bottom={1}
            px={2}
            fontSize={12}
            bgColor={bgColorScheme + palette200}
            borderRadius="full"
          >
            {spec}
          </Box>
        </Flex>
      </Box>
    </AspectRatio>
  );
}
