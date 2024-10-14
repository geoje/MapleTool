import { IconButton, Image, Tooltip } from "@chakra-ui/react";
import { ItemEquipmentDetail } from "../../../types/character/itemEquipment";
import { getMaxPotentialIndex } from "../../../utils/potential";
import { BORDER_COLOR } from "../../../constants/enhance/potential";
import ItemToolTip from "./itemTooltip";

export default function SlotButton({
  item,
  transparent,
  onClick,
}: {
  item?: ItemEquipmentDetail;
  transparent?: boolean;
  onClick?: () => void;
}) {
  const potentialIndex = item ? getMaxPotentialIndex(item) : -1;

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
        aria-label="slot"
        w="40px"
        borderWidth={1}
        borderColor={
          potentialIndex != -1 && !transparent
            ? BORDER_COLOR[potentialIndex]
            : undefined
        }
        icon={
          <Image
            src={item?.item_icon}
            opacity={transparent ? 0.1 : 1}
            maxW="none"
          />
        }
        onClick={onClick}
      />
    </Tooltip>
  ) : (
    <IconButton aria-label="item" borderWidth={1} />
  );
}
