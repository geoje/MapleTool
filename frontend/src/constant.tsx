import Construct from "./content/construct";
import Artifact from "./content/artifact/artifact";

export const KEY_COLLAPSED = "sidebar-collapsed";

export const LINKS = [
  {
    name: "potential",
    label: "잠재능력",
    image: "/link/cube.svg",
    content: <Construct />,
    building: true,
  },
  {
    name: "starforce",
    label: "스타포스",
    image: "/link/star.svg",
    content: <Construct />,
    building: true,
  },
  {
    name: "union-raid",
    label: "공격대",
    image: "/link/union-raid.svg",
    content: <Construct />,
    building: true,
  },
  {
    name: "union-artifact",
    label: "아티팩트",
    image: "/link/union-artifact.svg",
    content: <Artifact />,
    building: true,
  },
];
