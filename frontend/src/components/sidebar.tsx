import {
  Button,
  Flex,
  IconButton,
  Image,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { links } from "../main";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <VStack
      minHeight="100vh"
      p={2}
      align="stretch"
      bgColor="white"
      position="sticky"
      top={0}
    >
      <Flex align="center">
        <Button
          flex={1}
          px={4}
          as={Link}
          to="/"
          justifyContent="start"
          leftIcon={<Image boxSize="24px" src="/logo.svg" />}
          variant="ghost"
          size="lg"
        >
          메이플 도구
        </Button>
        <IconButton
          aria-label="expand"
          variant="ghost"
          icon={<MdKeyboardArrowLeft />}
        />
      </Flex>
      {links.map((link) => (
        <Button
          as={Link}
          to={"/" + link.name}
          key={link.name}
          justifyContent="start"
          variant={pathname.startsWith("/" + link.name) ? "solid" : "ghost"}
          leftIcon={<Image boxSize="24px" src={link.image} objectFit="cover" />}
        >
          {link.label}
        </Button>
      ))}
    </VStack>
  );
}
