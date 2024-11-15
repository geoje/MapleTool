import { ListItem, UnorderedList } from "@chakra-ui/react";

export default function Notice() {
  return <UnorderedList pt={4} fontSize="small">
    <ListItem>접속한지 오래되었을 경우 기본 정보만 조회 가능합니다.</ListItem>
  </UnorderedList>;
};