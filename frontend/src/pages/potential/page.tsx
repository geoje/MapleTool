import { Stack } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";

export default function Potential() {
  return (
    <>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard order={1} title="장비 가져오기"></BoardCard>
        <BoardCard order={2} title="장비 선택"></BoardCard>
        <BoardCard order={3} title="큐브 선택"></BoardCard>
        <BoardCard order={4} title="천장 입력"></BoardCard>
      </Stack>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard order={5} title="장비 변화"></BoardCard>
        <BoardCard order={6} title="재설정"></BoardCard>
      </Stack>
    </>
  );
}
