import { Flex } from "@chakra-ui/react";
import Lottie from "lottie-react";
import lottiePainting from "../lottie/1707020581363.json";

export default function Construct() {
  return (
    <Flex flex={1} p={4} justify="center" align="center">
      <Lottie loop animationData={lottiePainting} />
    </Flex>
  );
}
