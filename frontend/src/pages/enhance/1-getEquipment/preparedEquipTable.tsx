import { SimpleGrid } from "@chakra-ui/react";
import { SET_TYPE } from "../../../constants/enhance/set";
import { getPreparedEquipmentGrid } from "../../../utils/equipment";
import SlotButton from "../common/slotButton";

export default function PreparedEquipTable({ preset }: { preset: SET_TYPE }) {
  return (
    <SimpleGrid columns={5} px={1} gap={1}>
      {getPreparedEquipmentGrid(preset).flatMap((row, i) =>
        row.map((item, j) =>
          item ? (
            <SlotButton key={`item-${i}-${j}`} item={item} />
          ) : (
            <div key={`item-${i}-${j}`} />
          )
        )
      )}
    </SimpleGrid>
  );
}
