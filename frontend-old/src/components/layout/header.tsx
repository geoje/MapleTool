import {
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { LINKS } from "../../constants/links";
import MobileDrawer from "./mobileDrawer";
import { useEffect } from "react";
import { useAppSelector } from "../../stores/hooks";
import { useBasicQuery } from "../../stores/characterApi";
import CharacterImage from "../content/characterImage";

export default function Header() {
  return (
    <>
      <Desktop />
      <Mobile />
    </>
  );
}

function Desktop() {
  const { pathname } = useLocation();
  const name = useAppSelector((state) => state.user.name);
  const { data } = useBasicQuery(name, { skip: !name });

  const title = LINKS.find((link) =>
    pathname.startsWith("/" + link.name)
  )?.label;

  useEffect(() => {
    document.title = "메이플 도구" + (title ? " | " + title : "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Flex display={{ base: "none", md: "flex" }} p={2} align="center">
      <Heading size="md" p={2}>
        {title ?? "홈"}
      </Heading>
      <Spacer />
      {pathname != "/" && name && (
        <Button
          as={Link}
          to="/"
          variant="ghost"
          leftIcon={
            <CharacterImage
              boxSizePx={32}
              src={data?.character_image}
              adjust={!data?.character_exp_rate}
            />
          }
        >
          {data?.character_name}
        </Button>
      )}
    </Flex>
  );
}

function Mobile() {
  const { pathname } = useLocation();
  const dark = useColorMode().colorMode == "dark";
  const name = useAppSelector((state) => state.user.name);
  const { data } = useBasicQuery(name, { skip: !name });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      display={{ base: "flex", md: "none" }}
      p={2}
      bgColor={dark ? "gray.800" : "white"}
      align="center"
    >
      <IconButton
        aria-label="drawer"
        icon={<MdMenu />}
        size="lg"
        variant="ghost"
        onClick={onOpen}
      />
      <Heading size="md">
        {pathname == "/"
          ? "홈"
          : LINKS.find((link) => pathname.startsWith("/" + link.name))?.label}
      </Heading>
      <Spacer />
      {pathname == "/" || (
        <IconButton
          aria-label="profile"
          as={Link}
          to="/"
          size="lg"
          variant="ghost"
          icon={
            <CharacterImage
              boxSizePx={32}
              src={data?.character_image}
              adjust={!data?.character_exp_rate}
            />
          }
        />
      )}
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
