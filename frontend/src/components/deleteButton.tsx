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
      background={isDark ? "whiteAlpha.200" : "blackAlpha.200"}
      transition="background 0.2s"
      borderRadius="100%"
      onClick={onClick}
      _hover={{
        background: isDark ? "whiteAlpha.400" : "blackAlpha.400",
      }}
    >
      <Icon as={LuX} display="block" w={3} h={3} />
    </Box>
  );
}
