import {
  Divider,
  IconButton,
  Image,
  Tooltip,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { LINKS } from "../../constants/links";

export default function CollapsedSidebar({
  onExpand,
}: {
  onExpand: React.MouseEventHandler;
}) {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <VStack
      display={{ base: "none", md: "flex" }}
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
        icon={<LuChevronRight size={20} />}
        onClick={onExpand}
      />
    </VStack>
  );
}
