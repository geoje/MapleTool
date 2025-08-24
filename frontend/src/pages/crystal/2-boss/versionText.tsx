import { Text, useColorMode } from "@chakra-ui/react";

export default function VersionText() {
  const dark = useColorMode().colorMode == "dark";

  return (
    <Text
      mt={2}
      textAlign="end"
      fontSize="small"
      color={`gray.${dark ? 500 : 500}`}
    >
      Ver. 2025-08-21
    </Text>
  );
}
