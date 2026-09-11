import enhance from "../assets/link/enhance.svg";
import crystal from "../assets/link/crystal.svg";
import artifact from "../assets/link/artifact.svg";
import Artifact from "../pages/artifact/page";
import Crystal from "../pages/crystal/page";
import Enhance from "../pages/enhance/page";

export const LINKS: {
  name: string;
  label: string;
  icon: string;
  element: JSX.Element;
}[] = [
  {
    name: "enhance",
    label: "강화",
    icon: enhance,
    element: <Enhance />,
  },
  {
    name: "union-artifact",
    label: "아티팩트",
    icon: artifact,
    element: <Artifact />,
  },
  {
    name: "crystal",
    label: "보스수익",
    icon: crystal,
    element: <Crystal />,
  },
];
