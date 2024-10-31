import { Text } from "@chakra-ui/react";

export default function RequiredText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Text size="md" textAlign="center" opacity={0.6}>
      {children}
    </Text>
  );
}
