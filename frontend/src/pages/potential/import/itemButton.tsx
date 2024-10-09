import { IconButton, Image, Tooltip } from "@chakra-ui/react";
import ItemToolTip from "./itemToolTip";
import { ItemEquipmentDetail } from "../../../types/character/itemEquipment";
import { BORDER_COLOR } from "../../../service/character/itemEquipment/potentialConst";
import PotentialService from "../../../service/character/itemEquipment/potential";

export default function ItemButton({
  item,
  appear = true,
  colorScheme,
  onClick,
}: {
  item?: ItemEquipmentDetail;
  appear?: boolean;
  colorScheme?: string;
  onClick?: () => void;
}) {
  const potentialIndex = item
    ? PotentialService.getMaxPotentialIndex(item)
    : -1;

  return item ? (
    <Tooltip
      color="white"
      background="blackAlpha.800"
      w={64}
      p={0}
      borderRadius={4}
      label={<ItemToolTip item={item} />}
    >
      <IconButton
        aria-label="item"
        borderWidth={1}
        borderColor={
          appear && potentialIndex != -1
            ? BORDER_COLOR[potentialIndex]
            : undefined
        }
        colorScheme={colorScheme}
        icon={
          <Image
            src={item?.item_icon}
            opacity={appear ? 1 : 0.1}
            style={{ imageRendering: "pixelated" }}
          />
        }
        onClick={onClick}
      />
    </Tooltip>
  ) : (
    <IconButton aria-label="item" borderWidth={1} />
  );
}
