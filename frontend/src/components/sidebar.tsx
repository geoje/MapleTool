import {
  Button,
  Flex,
  IconButton,
  Image,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function Sidebar() {
  return (
    <VStack align="flex-start">
      <Flex w="100%" align="center">
        <Button
          leftIcon={<Image boxSize="24px" src="/logo.svg" />}
          variant="unstyled"
          size="lg"
          px={4}
        >
          메이플 도구
        </Button>
        <Spacer />
        <IconButton
          aria-label="expand"
          variant="ghost"
          icon={<MdKeyboardArrowLeft />}
        />
      </Flex>
      <Button>test</Button>
    </VStack>
  );
}
