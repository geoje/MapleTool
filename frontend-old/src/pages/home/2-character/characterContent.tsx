import { Flex, Icon, Image, Text, useColorMode } from "@chakra-ui/react";
import { Basic } from "../../../types/character/basic";
import { getJobIcon } from "../../../utils/icon";
import { getWorldIcon } from "../../../utils/icon";
import CharacterImage from "../../../components/content/characterImage";
import { LuActivity } from "react-icons/lu";

export default function CharacterContent({
  data,
  fallbackName,
  statusElement,
}: {
  data?: Basic;
  fallbackName?: string;
  statusElement?: JSX.Element;
}) {
  const dark = useColorMode().colorMode == "dark";
  const palleteGray300 = dark ? "gray.400" : "gray.500";

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
        {data?.date?.startsWith("2023-12-20") && (
          <Icon as={LuActivity} strokeWidth={3} color={palleteGray300} />
        )}
      </Flex>
    </>
  );
}
