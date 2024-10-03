import { Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { setName, setNameAndAddHistory } from "../../../stores/userSlice";
import { useEffect } from "react";
import { useBasicQuery } from "../../../stores/characterApi";
import { useSuccessToast } from "../../../hooks/useToast";
import GetWorldIconFromLabel from "../../../utils/getWorldIconFromLabel";
import characterBlank from "../../../assets/union/raid/character-blank.png";

export default function CharacterButton({ name }: { name: string }) {
  const toastSuccess = useSuccessToast();
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.name);
  const selected = userName == name;
  const { data, isFetching, refetch } = useBasicQuery(name, { skip: !name });

  useEffect(() => {
    if (!selected || !name) return;
    refetch().then((res) => {
      toastSuccess({
        title: "캐릭터 기본 정보 갱신됨",
        description: res.data?.character_name,
      });
      return res;
    });
  }, [selected]);

  return (
    <Button
      p={2}
      size="xs"
      w={44}
      height="auto"
      flexDir="column"
      variant={name && selected ? undefined : "ghost"}
      onClick={() => {
        if (selected) {
          dispatch(setName(""));
          return;
        }
        dispatch(setNameAndAddHistory(name));
      }}
    >
      <Flex gap={1}>
        <Image src={GetWorldIconFromLabel(data?.world_name)} />
        <Text fontSize="xs" fontWeight="bold">
          {data?.character_name ?? "캐릭터명"}
        </Text>
        <Text fontSize="xs" opacity={0.6}>
          {data?.character_class ?? "직업"}
        </Text>
      </Flex>
      <Image
        src={data?.character_image ?? characterBlank}
        filter={
          data?.character_image
            ? undefined
            : "opacity(0.2) drop-shadow(0 0 0 #000000);"
        }
      />
      <Flex gap={1}>
        <Text fontSize="xs">Lv.{data?.character_level ?? 0}</Text>
        {isFetching && <Spinner size="xs" />}
      </Flex>
    </Button>
  );
}
