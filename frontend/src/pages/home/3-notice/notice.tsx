import {
  Flex,
  Icon,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";
import { LuActivity } from "react-icons/lu";

export default function Notice() {
  const dark = useColorMode().colorMode == "dark";
  const palleteGray300 = dark ? "gray.400" : "gray.500";

  return (
    <UnorderedList pt={4} fontSize="small">
      <ListItem>
        <Flex align="center" gap={2}>
          <Icon as={LuActivity} strokeWidth={3} color={palleteGray300} />
          <Text>접속한지 오래되어 기능이 제한된 캐릭터</Text>
        </Flex>
      </ListItem>
    </UnorderedList>
  );
}
