import { Stack } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";

export default function Starforce() {
  return (
    <>
      <Stack>
        <BoardCard order={1} title="장비 선택"></BoardCard>
      </Stack>
    </>
  );
}
