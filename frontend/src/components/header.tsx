import {
  Box,
  Button,
  Flex,
  Heading,
  Hide,
  IconButton,
  Image,
  Show,
  Spacer,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { LINKS } from "../config";
import MobileDrawer from "./mobileDrawer";
import { useAppSelector } from "../reducer/hooks";
import { useEffect } from "react";
import { AnimatedCounter } from "react-animated-counter";
import { useDispatch } from "react-redux";
import { clearUserSpent } from "../reducer/userSlice";

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
  const characterBasic = useAppSelector((state) => state.character.basic);

  const title = LINKS.find((link) =>
    pathname.startsWith("/" + link.name)
  )?.label;

  useEffect(() => {
    document.title = "메이플 도구" + (title ? " | " + title : "");
  }, [pathname]);

  return (
    <Flex p={2} align="center">
      <Heading size="md" p={2}>
        {title ?? "홈"}
      </Heading>
      <Spacer />
      <SpentButton />
      {pathname == "/" || (
        <Button
          as={Link}
          to="/"
          variant="ghost"
          leftIcon={<ProfileImage src={characterBasic?.character_image} />}
        >
          {characterBasic?.character_name}
        </Button>
      )}
    </Flex>
  );
}

function Mobile() {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const characterBasic = useAppSelector((state) => state.character.basic);

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
      <SpentButton />
      {pathname == "/" || (
        <IconButton
          aria-label="profile"
          as={Link}
          to="/"
          variant="ghost"
          size="lg"
          icon={<ProfileImage src={characterBasic?.character_image} />}
        />
      )}
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

function SpentButton() {
  const dispatch = useDispatch();
  const spent = useAppSelector((state) => state.user.spent);
  const color = useColorModeValue("black", "white");

  return (
    <Tooltip label="사용한 메소 (클릭 시 초기화)">
      <Button
        variant="ghost"
        leftIcon={
          <Image
            src="/item-equipment/meso.png"
            style={{ imageRendering: "pixelated" }}
          />
        }
        onClick={() => dispatch(clearUserSpent())}
      >
        <AnimatedCounter
          includeDecimals={false}
          incrementColor={color}
          includeCommas
          fontSize="12px"
          color={color}
          value={spent}
        />
      </Button>
    </Tooltip>
  );
}

function ProfileImage({ src }: { src?: string }) {
  return (
    <Image
      boxSize="32px"
      src={src ?? "/union-raid/character-blank.png"}
      filter={src ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
