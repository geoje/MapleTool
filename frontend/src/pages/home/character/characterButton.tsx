import { Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { setName, setNameAndAddHistory } from "../../../stores/userSlice";
import { useEffect } from "react";
import { useBasicQuery } from "../../../stores/characterApi";
import { useSuccessToast } from "../../../hooks/useToast";

export default function CharacterButton({ name }: { name: string }) {
  const toastSuccess = useSuccessToast();
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.name);
  const selected = userName == name;
  const { data, isFetching, refetch } = useBasicQuery(name, { skip: !name });

  useEffect(() => {
    if (!selected) return;
    refetch().then((res) =>
      toastSuccess({
        title: "캐릭터 기본 정보 갱신됨",
        description: res.data?.character_name,
      })
    );
  }, [selected]);

  return (
    <Button
      p={2}
      size="xs"
      height="auto"
      flexDir="column"
      variant={selected ? undefined : "ghost"}
      onClick={() => {
        if (selected) {
          dispatch(setName(""));
          return;
        }
        dispatch(setNameAndAddHistory(name));
      }}
    >
      <Flex gap={1}>
        <Text fontSize="xs" fontWeight="bold">
          {data?.character_name}
        </Text>
        <Text fontSize="xs">Lv.{data?.character_level}</Text>
        <Text fontSize="xs" opacity={0.6}>
          {data?.character_class}
        </Text>
      </Flex>
      {isFetching && <Spinner size="xs" />}
      <Image src={data?.character_image} />
    </Button>
  );
}
