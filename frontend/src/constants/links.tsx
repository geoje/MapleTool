import { Badge } from "@chakra-ui/react";
import Potential from "../pages/potential/page";
import Starforce from "../pages/starforce/page";
import Raider from "../pages/raider/page";
import Artifact from "../pages/artifact/page";
import Crystal from "../pages/crystal/page";

export const links: {
  name: string;
  label: string;
  image: string;
  element: JSX.Element;
  status: JSX.Element;
}[] = [
  {
    name: "potential",
    label: "잠재능력",
    image: "/link/cube.svg",
    element: <Potential />,
    status: <Badge colorScheme="orange">개선중</Badge>,
  },
  {
    name: "starforce",
    label: "스타포스",
    image: "/link/star.svg",
    element: <Starforce />,
    status: <Badge colorScheme="yellow">제작중</Badge>,
  },
  {
    name: "union-raid",
    label: "공격대",
    image: "/link/union-raid.svg",
    element: <Raider />,
    status: <Badge colorScheme="yellow">제작중</Badge>,
  },
  {
    name: "union-artifact",
    label: "아티팩트",
    image: "/link/union-artifact.svg",
    element: <Artifact />,
    status: <></>,
  },
  {
    name: "crystal",
    label: "보스결정",
    image: "/link/crystal.svg",
    element: <Crystal />,
    status: <></>,
  },
];
