import {
  Badge,
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
  Show,
  Spacer,
  Switch,
  Tooltip,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { links } from "../main";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const COLLAPSED_KEY = "sidebarCollapsed";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem(COLLAPSED_KEY) != null
  );

  return (
    <Show above="md">
      {collapsed ? (
        <Collapsed
          onExpand={() => {
            setCollapsed(false);
            localStorage.removeItem(COLLAPSED_KEY);
          }}
        />
      ) : (
        <Expanded
          onCollapse={() => {
            setCollapsed(true);
            localStorage.setItem(COLLAPSED_KEY, "true");
          }}
        />
      )}
    </Show>
  );
}

function Expanded({ onCollapse }: { onCollapse: React.MouseEventHandler }) {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <div>
      <VStack
        w="256px"
        minHeight="100vh"
        p={2}
        align="stretch"
        bgColor={dark ? "gray.800" : "white"}
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
            icon={<IoIosArrowBack />}
            onClick={onCollapse}
          />
        </Flex>
        <Divider my={2} />
        {links.map((link) => (
          <Button
            as={Link}
            to={"/" + link.name}
            key={link.name}
            justifyContent="start"
            variant={pathname.startsWith("/" + link.name) ? "solid" : "ghost"}
            leftIcon={
              <Image boxSize="24px" src={link.image} objectFit="cover" />
            }
          >
            {link.label}
            <Spacer />
            {link.building && <Badge colorScheme="yellow">제작중</Badge>}
          </Button>
        ))}
        <Divider my={2} />
        <Button
          justifyContent="start"
          variant="ghost"
          leftIcon={<MdDarkMode size={24} color="#2B6CB0" />}
          rightIcon={<Switch isChecked={dark} />}
          onClick={(event: any) => {
            if (event.target.localName == "input") return;
            toggleColorMode();
          }}
        >
          어두운 테마
          <Spacer />
        </Button>
      </VStack>
    </div>
  );
}

function Collapsed({ onExpand }: { onExpand: React.MouseEventHandler }) {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <div>
      <VStack
        minHeight="100vh"
        p={2}
        align="center"
        bgColor={dark ? "gray.800" : "white"}
        position="sticky"
        top={0}
      >
        <Tooltip label="홈" placement="right">
          <IconButton
            aria-label="home"
            px={4}
            as={Link}
            to="/"
            justifyContent="start"
            icon={<Image boxSize="24px" src="/logo.svg" />}
            variant="ghost"
            size="lg"
          />
        </Tooltip>
        <Divider my={2} />
        {links.map((link) => (
          <Tooltip key={link.name} label={link.label} placement="right">
            <IconButton
              aria-label={link.name}
              as={Link}
              to={"/" + link.name}
              variant={pathname.startsWith("/" + link.name) ? "solid" : "ghost"}
              icon={<Image boxSize="24px" src={link.image} objectFit="cover" />}
            />
          </Tooltip>
        ))}
        <Divider my={2} />
        <Tooltip label={dark ? "밝은 테마" : "어두운 테마"} placement="right">
          <IconButton
            aria-label="expand"
            variant="ghost"
            icon={
              dark ? (
                <MdLightMode size={24} color="#ECC94B" />
              ) : (
                <MdDarkMode size={24} color="#2B6CB0" />
              )
            }
            onClick={toggleColorMode}
          />
        </Tooltip>
        <IconButton
          aria-label="expand"
          variant="ghost"
          icon={<IoIosArrowForward />}
          onClick={onExpand}
        />
      </VStack>
    </div>
  );
}
