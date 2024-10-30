import {
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Spacer,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { LINKS } from "../../constants/links";

export default function ExpandedSidebar({
  width,
  closeButton,
  onClose,
}: {
  width?: string;
  closeButton: JSX.Element;
  onClose?: () => void;
}) {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <VStack
      w={width}
      minHeight="100vh"
      position="sticky"
      top={0}
      p={2}
      align="stretch"
      bgColor={dark ? "gray.800" : "white"}
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
          onClick={onClose}
        >
          메이플 도구
        </Button>
        {closeButton}
      </Flex>
      <Divider my={2} />
      {LINKS.map((link) => (
        <Button
          as={Link}
          to={"/" + link.name}
          key={link.name}
          justifyContent="start"
          variant={pathname.startsWith("/" + link.name) ? undefined : "ghost"}
          leftIcon={<Image boxSize="24px" src={link.icon} />}
          onClick={onClose}
        >
          {link.label}
        </Button>
      ))}
      <Divider my={2} />
      <Button
        justifyContent="start"
        variant="ghost"
        leftIcon={
          <Icon
            as={dark ? MdLightMode : MdDarkMode}
            boxSize={6}
            color={dark ? "yellow.400" : "gray.500"}
          />
        }
        onClick={toggleColorMode}
      >
        {dark ? "밝은 테마" : "어두운 테마"}
        <Spacer />
      </Button>
    </VStack>
  );
}
