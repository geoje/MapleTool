import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
  deleteHistory,
  setName,
  setNameAndAddHistory,
} from "../../../stores/userSlice";
import { useBasicQuery } from "../../../stores/characterApi";
import { useSuccessToast } from "../../../hooks/useToast";
import characterBlank from "../../../assets/union/raid/character-blank.png";
import { GetWorldIcon } from "../../../utils/getWorldIcon";
import { GetJobIcon } from "../../../utils/getJobIcon";

export default function CharacterButton({ name }: { name: string }) {
  const isDark = useColorMode().colorMode == "dark";
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
      w={40}
      size="xs"
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
      {selected && (
        <Box
          position="absolute"
          top={-2}
          right={-2}
          transform="auto"
          background={isDark ? "whiteAlpha.200" : "blackAlpha.200"}
          transition="background 0.2s"
          p={1}
          borderRadius="100%"
          onClick={() => dispatch(deleteHistory(name))}
          _hover={{ background: isDark ? "whiteAlpha.400" : "blackAlpha.400" }}
        >
          <Icon as={CgClose} />
        </Box>
      )}
      <Flex gap={1} align="center">
        <Image src={GetJobIcon(data?.character_class)} />
        <Text fontSize="xs" opacity={0.6}>
          {data?.character_class ?? "직업"}
        </Text>
        <Text fontSize="xs">Lv.{data?.character_level ?? 0}</Text>
      </Flex>
      <Image
        src={data?.character_image ?? characterBlank}
        filter={
          data?.character_image
            ? undefined
            : "opacity(0.2) drop-shadow(0 0 0 #000000);"
        }
      />
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
    </Button>
  );
}
