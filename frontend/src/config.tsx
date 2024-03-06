import Artifact from "./content/artifact/page";
import { ThemeComponentProps, extendTheme } from "@chakra-ui/react";

export const KEY_COLLAPSED = "sidebar-collapsed";

export const LINKS = [
  {
    name: "potential",
    label: "잠재능력",
    image: "/link/cube.svg",
    content: <></>,
    building: true,
  },
  {
    name: "starforce",
    label: "스타포스",
    image: "/link/star.svg",
    content: <></>,
    building: true,
  },
  {
    name: "union-raid",
    label: "공격대",
    image: "/link/union-raid.svg",
    content: <></>,
    building: true,
  },
  {
    name: "union-artifact",
    label: "아티팩트",
    image: "/link/union-artifact.svg",
    content: <Artifact />,
    building: false,
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
