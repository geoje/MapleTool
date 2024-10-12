import crystal from "../assets/link/crystal.svg";
import cube from "../assets/link/cube.svg";
import artifact from "../assets/link/artifact.svg";
import Artifact from "../pages/artifact/page";
import Crystal from "../pages/crystal/page";
import Potential from "../pages/potential/page";

export const LINKS: {
  name: string;
  label: string;
  description: string;
  icon: string;
  element: JSX.Element;
}[] = [
  {
    name: "potential",
    label: "잠재능력",
    description: "메이플 큐브 계산기",
    icon: cube,
    element: <Potential />,
  },
  {
    name: "union-artifact",
    label: "아티팩트",
    description: "메이플 아티팩트 계산기",
    icon: artifact,
    element: <Artifact />,
  },
  {
    name: "crystal",
    label: "보스수익",
    description: "메이플 결정석 계산기",
    icon: crystal,
    element: <Crystal />,
  },
];
