import { Flex, Image, Stack, Text } from "@chakra-ui/react";

const DEFAULT_CHARACTER_IMAGE = "/union-raid/character-blank.png";

export default function Profile({
  src,
  name,
}: {
  src?: string;
  name?: string;
}) {
  return (
    <>
      <Flex
        display={["none", "none", "flex"]}
        align="center"
        gap={2}
        wrap="wrap"
      >
        <Image
          boxSize="48px"
          src={src?.length ? src : DEFAULT_CHARACTER_IMAGE}
          filter={src ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"}
          style={{ imageRendering: "pixelated" }}
        />
        <Text fontSize="small">{name}</Text>
      </Flex>
      <Stack
        display={["flex", "flex", "none"]}
        align="center"
        gap={2}
        wrap="wrap"
      >
        <Image
          boxSize="48px"
          src={src?.length ? src : DEFAULT_CHARACTER_IMAGE}
          filter={src ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"}
          style={{ imageRendering: "pixelated" }}
        />
        <Text fontSize="small">{name}</Text>
      </Stack>
    </>
  );
}
