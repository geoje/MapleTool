import {
  Alert,
  AlertDescription,
  AlertIcon,
  Flex,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import BoardCard from "../../components/layout/boardCard";
import ResultTable from "./3-statistics/resultTable";
import { useState } from "react";
import CharacterButtons from "./1-character/characterButtons";
import Boss from "./2-boss/boss";
import PreparedButtons from "./2-boss/preparedButtons";
import NameInput from "./1-character/nameInput";
import { LuShare2, LuTrash2 } from "react-icons/lu";
import { convertPlansToParams } from "../../services/boss";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  useInfoToast,
  useSuccessToast,
  useWarningToast,
} from "../../hooks/useToast";
import { setBossPlans } from "../../stores/userSlice";
import SharedModal from "./common/sharedModal";

export default function Crystal() {
  const dispatch = useAppDispatch();
  const bossPlans = useAppSelector((state) => state.user.bossPlans);
  const [selected, setSelected] = useState(-1);
  const toastInfo = useInfoToast();
  const toastWraning = useWarningToast();
  const toastSuccess = useSuccessToast();

  const ShareIconButton = () => (
    <Tooltip label="공유" placement="top">
      <IconButton
        aria-label="share"
        size="xs"
        icon={<LuShare2 size={16} />}
        variant="ghost"
        onClick={() => {
          if (!bossPlans.length) {
            toastWraning({ title: "캐릭터를 등록해주세요." });
            return;
          }

          const url = convertPlansToParams(bossPlans);
          const urlElement = (
            <Text fontSize="small" lineHeight={1} wordBreak="break-all">
              {url}
            </Text>
          );
          if (!navigator.clipboard) {
            toastInfo({
              title: "수동 링크 복사",
              description: urlElement,
            });
            return;
          }

          navigator.clipboard
            .writeText(url)
            .then(() =>
              toastSuccess({
                title: "클립보드에 복사됨",
                description: urlElement,
              })
            )
            .catch(() =>
              toastInfo({
                title: "수동 링크 복사",
                description: urlElement,
              })
            );
        }}
      />
    </Tooltip>
  );
  const DeleteIconButton = () => (
    <Tooltip label="전체 삭제" placement="top">
      <IconButton
        size="xs"
        aria-label="clear"
        variant="ghost"
        colorScheme="red"
        icon={<LuTrash2 size={16} />}
        onClick={() => dispatch(setBossPlans([]))}
      />
    </Tooltip>
  );

  return (
    <>
      <Alert variant="left-accent">
        <AlertIcon />
        <AlertDescription>4월 17일 패치 후 가격 기준입니다.</AlertDescription>
      </Alert>
      <Stack w={{ base: "100vw", md: "auto" }}>
        <BoardCard
          order={1}
          title="캐릭터 등록"
          right={
            <Flex gap={1}>
              <ShareIconButton />
              <DeleteIconButton />
            </Flex>
          }
        >
          <NameInput setSelected={setSelected} />
          <CharacterButtons selected={selected} setSelected={setSelected} />
        </BoardCard>
      </Stack>
      <Stack w={{ base: "100vw", md: "auto" }}>
        <BoardCard
          order={2}
          title="보스 선택"
          right={<PreparedButtons selected={selected} />}
        >
          <Boss selected={selected} />
        </BoardCard>
      </Stack>
      <Stack w={{ base: "100vw", md: "auto" }}>
        <BoardCard order={3} title="통계">
          <ResultTable bossPlans={bossPlans} />
        </BoardCard>
      </Stack>
      <SharedModal />
    </>
  );
}
