import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import CharacterImage from "../../../components/content/characterImage";

export default function Profile({
  src,
  adjust,
  name,
  loading,
}: {
  src?: string;
  adjust?: boolean;
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
        <CharacterImage boxSizePx={48} src={src} adjust={adjust} />
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
        <CharacterImage boxSizePx={48} src={src} adjust={adjust} />
        <Text fontSize="small">{name}</Text>
        {loading && <Spinner size="xs" />}
      </Stack>
    </>
  );
}
