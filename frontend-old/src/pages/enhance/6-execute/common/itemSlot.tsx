import { Flex, Image, useColorMode } from "@chakra-ui/react";

export default function ItemSlot({ image }: { image?: string }) {
  const dark = useColorMode().colorMode == "dark";

  return (
    <Flex
      p={4}
      bgColor={dark ? "gray.900" : "gray.50"}
      borderRadius={8}
      justify="center"
      align="center"
    >
      <Flex
        w={12}
        h={12}
        justify="center"
        align="center"
        backgroundColor={dark ? "gray.800" : "gray.200"}
        borderWidth={1}
        borderColor={dark ? "gray.400" : "gray.600"}
        borderStyle="dashed"
      >
        <Image src={image} />
      </Flex>
    </Flex>
  );
}
