import {
  Button,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  useColorMode,
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { links } from "../main";

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
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <Flex p={2} justify="space-between" align="center">
      <Heading size="md" px={2}>
        {pathname == "/"
          ? "홈"
          : links.find((link) => pathname.startsWith("/" + link.name))?.label}
      </Heading>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
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
    </Flex>
  );
}

function Mobile() {
  return <></>;
}
