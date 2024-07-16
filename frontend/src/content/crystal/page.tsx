import { Stack } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";

export default function Crystal() {
  return (
    <>
      <Stack>
        <BoardCard order={1} title="보스 선택"></BoardCard>
      </Stack>
      <Stack>
        <BoardCard order={2} title="통계"></BoardCard>
      </Stack>
    </>
  );
}
