import { Text } from "@chakra-ui/react";

export default function Boss({ selected }: { selected: number }) {
  return <Text>{selected} 선택됨</Text>;
}
