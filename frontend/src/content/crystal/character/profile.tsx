import { Flex, Hide, Image, Show, Stack, Text } from "@chakra-ui/react";

export default function Profile({
  src,
  name,
}: {
  src?: string;
  name?: string;
}) {
  return (
    <>
      <Show above="md">
        <Flex align="center" gap={2} wrap="wrap">
          <Image
            boxSize="48px"
            src={src ?? "/union-raid/character-blank.png"}
            filter={
              src ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"
            }
            style={{ imageRendering: "pixelated" }}
          />
          <Text fontSize="small">{name}</Text>
        </Flex>
      </Show>
      <Hide above="md">
        <Stack align="center" gap={2} wrap="wrap">
          <Image
            boxSize="48px"
            src={src ?? "/union-raid/character-blank.png"}
            filter={
              src ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"
            }
            style={{ imageRendering: "pixelated" }}
          />
          <Text fontSize="small">{name}</Text>
        </Stack>
      </Hide>
    </>
  );
}
