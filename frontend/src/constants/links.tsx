import enhance from "../assets/link/enhance.svg";
import crystal from "../assets/link/crystal.svg";
import artifact from "../assets/link/artifact.svg";
import Artifact from "../pages/artifact/page";
import Crystal from "../pages/crystal/page";
import Enhance from "../pages/enhance/page";

export const LINKS: {
  name: string;
  label: string;
  description: string;
  icon: string;
  element: JSX.Element;
}[] = [
  {
    name: "enhance",
    label: "강화",
    description: "메이플 아이템 강화 시뮬레이터",
    icon: enhance,
    element: <Enhance />,
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
