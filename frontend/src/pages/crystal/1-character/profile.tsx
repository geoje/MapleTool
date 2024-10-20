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
        gap={1}
        wrap="wrap"
      >
        <Image
          boxSize="48px"
          src={src}
          fallback={<BlankCharacterImage />}
          style={{ imageRendering: "pixelated" }}
        />
        <Stack align="center" gap={1}>
          <Text fontSize="small">{name}</Text>
          {loading && <Spinner size="xs" />}
        </Stack>
      </Flex>
      <Stack
        display={["flex", "flex", "none"]}
        align="center"
        gap={0}
        wrap="wrap"
      >
        <Image
          boxSize="48px"
          src={src}
          fallback={<BlankCharacterImage />}
          style={{ imageRendering: "pixelated" }}
        />
        <Text fontSize="small">{name}</Text>
        {loading && <Spinner size="xs" />}
      </Stack>
    </>
  );
}

function BlankCharacterImage() {
  return (
    <Image
      boxSize="48px"
      src={characterBlank}
      filter="opacity(0.2) drop-shadow(0 0 0 #000000);"
    />
  );
}
