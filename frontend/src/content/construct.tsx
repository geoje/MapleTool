import { Flex } from "@chakra-ui/react";
import { LuConstruction } from "react-icons/lu";

export default function Construct() {
  return (
    <Flex p={4}>
      <LuConstruction size={64} opacity={0.2} />
    </Flex>
  );
}
