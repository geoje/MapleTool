import { Box, Image } from "@chakra-ui/react";
import { ItemEquipmentDetail } from "../../../types/character/itemEquipment/itemEquipment";
import { getSpecialRingIcon } from "../../../utils/icon";

export default function ItemIcon({
  item,
  opacity,
}: {
  item: ItemEquipmentDetail;
  opacity?: number;
}) {
  return (
    <Box>
      <Image src={item?.item_icon} opacity={opacity} maxW="none" />
      {item?.special_ring_level ? (
        <Image
          position="absolute"
          left={1}
          bottom={1}
          src={getSpecialRingIcon(item?.special_ring_level)}
          opacity={opacity}
        />
      ) : undefined}
    </Box>
  );
}
