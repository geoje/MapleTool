import {
  Button,
  Flex,
  Heading,
  Hide,
  IconButton,
  Image,
  Show,
  Spacer,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { LINKS } from "../constants/links";
import MobileDrawer from "./mobileDrawer";
import { useEffect } from "react";
import { useAppSelector } from "../stores/hooks";
import { useBasicQuery } from "../stores/characterApi";
import characterBlank from "../assets/union/raid/character-blank.png";

export default function Header() {
  return (
    <>
      <Show above="md">
        <Desktop />
      </Show>
      <Hide above="md">
        <Mobile />
      </Hide>
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
    <Flex p={2} align="center">
      <Heading size="md" p={2}>
        {title ?? "홈"}
      </Heading>
      <Spacer />
      {pathname == "/" || (
        <Button
          as={Link}
          to="/"
          variant="ghost"
          leftIcon={<ProfileImage src={data?.character_image} />}
        >
          {data?.character_name}
        </Button>
      )}
    </Flex>
  );
}

function Mobile() {
  const { pathname } = useLocation();
  const name = useAppSelector((state) => state.user.name);
  const { data } = useBasicQuery(name, { skip: !name });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <Flex p={2} bgColor={dark ? "gray.800" : "white"} align="center">
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
          variant="ghost"
          size="lg"
          icon={<ProfileImage src={data?.character_image} />}
        />
      )}
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

function ProfileImage({ src }: { src?: string }) {
  return (
    <Image
      boxSize="32px"
      src={src ?? characterBlank}
      filter={src ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
