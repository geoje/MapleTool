import { IconButton, Image, Tooltip } from "@chakra-ui/react";
import ItemToolTip from "./itemToolTip";
import ItemEquipmentService from "../../../service/character/itemEquipment/itemEquipment";
import { CharacterItemEquipmentDetail } from "../../../dto/character/characterItemEquipment";

export default function ItemButton({
  item,
  appear = true,
  onClick,
}: {
  item?: CharacterItemEquipmentDetail;
  appear?: boolean;
  onClick?: () => void;
}) {
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
          appear
            ? ItemEquipmentService.maxPotential(item)?.BORDER_COLOR
            : undefined
        }
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
