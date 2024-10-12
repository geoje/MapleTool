import {
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
  Show,
  Spacer,
  Tooltip,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LINKS } from "../constants/links";

const KEY_COLLAPSED = "sidebar-collapsed";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem(KEY_COLLAPSED) != null
  );

  return (
    <Show above="md">
      {collapsed ? (
        <CollapsedSidebar
          onExpand={() => {
            setCollapsed(false);
            localStorage.removeItem(KEY_COLLAPSED);
          }}
        />
      ) : (
        <ExpandedSidebar
          width="var(--chakra-sizes-2xs)"
          closeButton={
            <IconButton
              aria-label="expand"
              variant="ghost"
              icon={<IoIosArrowBack />}
              onClick={() => {
                setCollapsed(true);
                localStorage.setItem(KEY_COLLAPSED, "true");
              }}
            />
          }
        />
      )}
    </Show>
  );
}

export function ExpandedSidebar({
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
    <div>
      <VStack
        w={width}
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
            variant={pathname.startsWith("/" + link.name) ? "solid" : "ghost"}
            leftIcon={
              <Image boxSize="24px" src={link.icon} objectFit="cover" />
            }
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
            dark ? (
              <MdLightMode size={24} color="#ECC94B" />
            ) : (
              <MdDarkMode size={24} color="#718096" />
            )
          }
          onClick={toggleColorMode}
        >
          {dark ? "밝은 테마" : "어두운 테마"}
          <Spacer />
        </Button>
      </VStack>
    </div>
  );
}

function CollapsedSidebar({ onExpand }: { onExpand: React.MouseEventHandler }) {
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
            icon={<Image boxSize="24px" src="/logo.svg" />}
            variant="ghost"
            size="lg"
          />
        </Tooltip>
        <Divider my={2} />
        {LINKS.map((link) => (
          <Tooltip key={link.name} label={link.label} placement="right">
            <IconButton
              aria-label={link.name}
              as={Link}
              to={"/" + link.name}
              variant={pathname.startsWith("/" + link.name) ? "solid" : "ghost"}
              icon={<Image boxSize="24px" src={link.icon} objectFit="cover" />}
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
                <MdDarkMode size={24} color="#718096" />
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
