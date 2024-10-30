import { Box, Icon, useColorMode } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";

export default function DeleteButton({ onClick }: { onClick: () => void }) {
  const dark = useColorMode().colorMode == "dark";

  return (
    <Box
      position="absolute"
      top={-2}
      right={-2}
      w={5}
      h={5}
      p={1}
      zIndex={1}
      cursor="pointer"
      transform="auto"
      background={dark ? "whiteAlpha.600" : "blackAlpha.600"}
      transition="background 0.2s"
      borderRadius="100%"
      onClick={onClick}
      _hover={{
        background: dark ? "whiteAlpha.800" : "blackAlpha.800",
      }}
    >
      <Icon
        as={LuX}
        w={3}
        h={3}
        display="block"
        color={dark ? "black" : "white"}
      />
    </Box>
  );
}
