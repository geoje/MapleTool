import {
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { links } from "../constant";
import MobileDrawer from "./mobileDrawer";

export default function Header() {
  return (
    <>
      <Show above="sm">
        <Desktop />
      </Show>
      <Show below="sm">
        <Mobile />
      </Show>
    </>
  );
}

function Desktop() {
  const { pathname } = useLocation();

  return (
    <Flex p={2} justify="space-between" align="center">
      <Heading size="md" px={2}>
        {pathname == "/"
          ? "홈"
          : links.find((link) => pathname.startsWith("/" + link.name))?.label}
      </Heading>
      <Profile />
    </Flex>
  );
}

function Mobile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <Flex p={2} bgColor={dark ? "gray.800" : "white"} justify="space-between">
      <IconButton
        aria-label="drawer"
        icon={<MdMenu />}
        size="lg"
        variant="ghost"
        onClick={onOpen}
      />
      <Profile size="lg" />
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

function Profile({ size }: { size?: string }) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        size={size}
        leftIcon={
          <Image
            boxSize="32px"
            src="/union-raid/character-blank.png"
            filter="opacity(0.2) drop-shadow(0 0 0 #000000);"
          />
        }
      ></MenuButton>
      <MenuList>
        <MenuItem color="red" icon={<TbLogout />}>
          등록 해제
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
