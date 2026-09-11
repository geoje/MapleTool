import RequiredText from "../../../components/content/requiredText";
import { MATERIAL_TYPE } from "../../../constants/enhance/material";
import GrindStone from "./grindStone/grindStone";
import Potential from "./potential/potential";
import Rebirth from "./rebirth/rebirth";
import Startforce from "./starforce/startforce";

export default function Execute({
  inventoryIndex,
  materialType,
}: {
  inventoryIndex: number;
  materialType?: MATERIAL_TYPE;
}) {
  if (inventoryIndex == -1 || !materialType) {
    const message =
      (inventoryIndex == -1 ? "장비" : "") +
      (inventoryIndex == -1 && !materialType ? "와 " : "") +
      (!materialType ? "재료" : "") +
      "를 선택해주세요.";

    return <RequiredText>{message}</RequiredText>;
  }

  const executions: {
    element: JSX.Element;
    materialTypes: MATERIAL_TYPE[];
  }[] = [
    {
      element: <Startforce inventoryIndex={inventoryIndex} />,
      materialTypes: [MATERIAL_TYPE.STARFORCE],
    },
    {
      element: (
        <Rebirth inventoryIndex={inventoryIndex} materialType={materialType} />
      ),
      materialTypes: [
        MATERIAL_TYPE.POWERFUL,
        MATERIAL_TYPE.ETERNAL,
        MATERIAL_TYPE.BLACK_REBIRTH,
        MATERIAL_TYPE.ABYSS,
      ],
    },
    {
      element: <GrindStone inventoryIndex={inventoryIndex} />,
      materialTypes: [MATERIAL_TYPE.GRINDSTONE],
    },
    {
      element: (
        <Potential
          inventoryIndex={inventoryIndex}
          materialType={materialType}
        />
      ),
      materialTypes: [
        MATERIAL_TYPE.STRANGE,
        MATERIAL_TYPE.MASTER,
        MATERIAL_TYPE.ARTISAN,
        MATERIAL_TYPE.RED,
        MATERIAL_TYPE.BLACK,
        MATERIAL_TYPE.STRANGE_ADDI,
        MATERIAL_TYPE.ADDI,
        MATERIAL_TYPE.WHITE_ADDI,
        MATERIAL_TYPE.POTENTIAL,
        MATERIAL_TYPE.POTENTIAL_ADDI,
      ],
    },
  ];

  for (const execution of executions) {
    if (execution.materialTypes.includes(materialType))
      return execution.element;
  }

  return <RequiredText>개발중인 기능입니다.</RequiredText>;
}
