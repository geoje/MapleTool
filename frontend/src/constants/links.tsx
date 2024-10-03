import crystal from "../assets/link/crystal.svg";
import cube from "../assets/link/cube.svg";
import artifact from "../assets/link/artifact.svg";

export const links: {
  name: string;
  label: string;
  icon: string;
  element: JSX.Element;
}[] = [
  {
    name: "potential",
    label: "잠재능력",
    icon: cube,
    element: <></>,
  },
  {
    name: "union-artifact",
    label: "아티팩트",
    icon: artifact,
    element: <></>,
  },
  {
    name: "crystal",
    label: "보스결정",
    icon: crystal,
    element: <></>,
  },
];
