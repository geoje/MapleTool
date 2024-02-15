import { Box, useColorModeValue } from "@chakra-ui/react";

export default function Card({ children }: { children: React.ReactNode }) {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box p={4} bgColor={bgColor} borderRadius={8}>
      {children}
    </Box>
  );
}
