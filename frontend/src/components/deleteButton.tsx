import { Box, Icon, useColorMode } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";

export default function DeleteButton({ onClick }: { onClick: () => void }) {
  const isDark = useColorMode().colorMode == "dark";

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
      background={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
      transition="background 0.2s"
      borderRadius="100%"
      onClick={onClick}
      _hover={{
        background: isDark ? "whiteAlpha.800" : "blackAlpha.800",
      }}
    >
      <Icon
        as={LuX}
        w={3}
        h={3}
        display="block"
        color={isDark ? "black" : "white"}
      />
    </Box>
  );
}
