import {
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
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
import characterBlank from "../../assets/union/raid/character-blank.png";

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
      {pathname == "/" || (
        <Button
          as={Link}
          to="/"
          variant="ghost"
          leftIcon={<ProfileImage src={name ? data?.character_image : ""} />}
        >
          {name ? data?.character_name : ""}
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
          icon={<ProfileImage src={name ? data?.character_image : ""} />}
        />
      )}
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

function ProfileImage({ src }: { src?: string }) {
  return <Image boxSize="32px" src={src} fallback={<BlankCharacterImage />} />;
}

function BlankCharacterImage() {
  return (
    <Image
      boxSize="32px"
      src={characterBlank}
      filter="opacity(0.2) drop-shadow(0 0 0 #000000);"
    />
  );
}
