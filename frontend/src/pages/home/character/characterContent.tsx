import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { CharacterBasic } from "../../../types/character/characterBasic";
import { GetJobIcon } from "../../../utils/getJobIcon";
import { GetWorldIcon } from "../../../utils/getWorldIcon";
import characterBlank from "../../../assets/union/raid/character-blank.png";

export default function CharacterContent({
  isFetching,
  data,
}: {
  isFetching: boolean;
  data: CharacterBasic | undefined;
}) {
  return (
    <>
      <Flex gap={1} align="center">
        <Image src={GetJobIcon(data?.character_class)} />
        <Text fontSize="xs" opacity={0.6}>
          {data?.character_class ?? "직업"}
        </Text>
        <Text fontSize="xs">Lv.{data?.character_level ?? 0}</Text>
      </Flex>
      {data?.character_image ? (
        <Image src={data.character_image} fallback={<BlankCharacterImage />} />
      ) : (
        <BlankCharacterImage />
      )}
      <Flex pt={2} gap={1} align="center">
        {isFetching ? (
          <Spinner w="14px" size="xs" />
        ) : (
          <Image src={GetWorldIcon(data?.world_name)} />
        )}
        <Text fontSize="xs" fontWeight="bold">
          {data?.character_name ?? "캐릭터명"}
        </Text>
      </Flex>
    </>
  );
}

function BlankCharacterImage() {
  return (
    <Image
      src={characterBlank}
      filter="opacity(0.2) drop-shadow(0 0 0 #000000);"
    />
  );
}
