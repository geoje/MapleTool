import { Stack } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";

export default function Raider() {
  return (
    <>
      <Stack>
        <BoardCard order={1} title="캐릭터 등록"></BoardCard>
      </Stack>
    </>
  );
}
