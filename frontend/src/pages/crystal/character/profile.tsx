import { Flex, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import characterBlank from "../../../assets/union/raid/character-blank.png";

export default function Profile({
  src,
  name,
  loading,
}: {
  src?: string;
  name?: string;
  loading?: boolean;
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
          src={src ?? characterBlank}
          filter={src ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"}
          style={{ imageRendering: "pixelated" }}
        />
        <Stack>
          <Text fontSize="small">{name}</Text>
          {loading && <Spinner size="xs" />}
        </Stack>
      </Flex>
      <Stack
        display={["flex", "flex", "none"]}
        align="center"
        gap={2}
        wrap="wrap"
      >
        <Image
          boxSize="48px"
          src={src ?? characterBlank}
          filter={src ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"}
          style={{ imageRendering: "pixelated" }}
        />
        <Text fontSize="small">{name}</Text>
      </Stack>
    </>
  );
}
