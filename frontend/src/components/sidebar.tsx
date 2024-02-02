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
    <VStack align="stretch" p={2} bgColor="white">
      <Flex align="center">
        <Button
          as={Link}
          to="/"
          leftIcon={<Image boxSize="24px" src="/logo.svg" />}
          variant="ghost"
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
