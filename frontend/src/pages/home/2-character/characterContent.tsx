import { Flex, Image, Text } from "@chakra-ui/react";
import { Basic } from "../../../types/character/basic";
import { getJobIcon } from "../../../utils/icon";
import { getWorldIcon } from "../../../utils/icon";
import CharacterImage from "../../../components/content/characterImage";

export default function CharacterContent({
  data,
  fallbackName,
  statusElement,
}: {
  data?: Basic;
  fallbackName?: string;
  statusElement?: JSX.Element;
}) {
  return (
    <>
      <Flex gap={1} align="center">
        <Image src={getJobIcon(data?.character_class)} />
        <Text fontSize="xs" opacity={0.6}>
          {data?.character_class ?? "직업"}
        </Text>
        <Text fontSize="xs">Lv.{data?.character_level ?? 0}</Text>
      </Flex>
      <CharacterImage
        src={data?.character_image}
        adjust={!data?.character_exp_rate}
      />
      <Flex pt={2} gap={1} align="center">
        <Image src={getWorldIcon(data?.world_name)} />
        <Text fontSize="xs" fontWeight="bold">
          {data?.character_name ?? (fallbackName ? fallbackName : "캐릭터명")}
        </Text>
        {statusElement}
      </Flex>
    </>
  );
}
