import { Badge, ThemeComponentProps, extendTheme } from "@chakra-ui/react";
import Potential from "./content/potential/page";
import Starforce from "./content/starforce/page";
import Raider from "./content/raider/page";
import Artifact from "./content/artifact/page";
import Crystal from "./content/crystal/page";

export const KEY_COLLAPSED = "sidebar-collapsed";

export const LINKS = [
  {
    name: "potential",
    label: "잠재능력",
    image: "/link/cube.svg",
    content: <Potential />,
    status: <Badge colorScheme="yellow">개선중</Badge>,
  },
  {
    name: "starforce",
    label: "스타포스",
    image: "/link/star.svg",
    content: <Starforce />,
    status: <Badge colorScheme="yellow">제작중</Badge>,
  },
  {
    name: "union-raid",
    label: "공격대",
    image: "/link/union-raid.svg",
    content: <Raider />,
    status: <Badge colorScheme="yellow">제작중</Badge>,
  },
  {
    name: "union-artifact",
    label: "아티팩트",
    image: "/link/union-artifact.svg",
    content: <Artifact />,
    status: <></>,
  },
  {
    name: "crystal",
    label: "보스결정",
    image: "/link/crystal.svg",
    content: <Crystal />,
    status: <></>,
  },
];

export const theme = extendTheme({
  fonts: {
    heading: `"Noto Sans KR"`,
    body: `"Noto Sans KR"`,
  },
  styles: {
    global: (props: ThemeComponentProps) => ({
      "html, body": {
        backgroundColor: props.colorMode == "dark" ? "gray.900" : "gray.50",
      },
    }),
  },
});
