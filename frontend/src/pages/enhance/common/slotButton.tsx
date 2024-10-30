import { IconButton, Image, Tooltip } from "@chakra-ui/react";
import { ItemEquipmentDetail } from "../../../types/character/itemEquipment/itemEquipment";
import ItemToolTip from "./itemTooltip";
import { getMaxGrade } from "../../../services/potential";
import { POTENTIAL_INFOS } from "../../../constants/enhance/potential";

export default function SlotButton({
  item,
  colorScheme,
  transparent,
  onClick,
}: {
  item?: ItemEquipmentDetail;
  colorScheme?: string;
  transparent?: boolean;
  onClick?: () => void;
}) {
  const grade = item ? getMaxGrade(item) : undefined;

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
          grade && !transparent ? POTENTIAL_INFOS[grade].borderColor : undefined
        }
        colorScheme={colorScheme}
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
    <IconButton aria-label="item" colorScheme={colorScheme} borderWidth={1} />
  );
}
