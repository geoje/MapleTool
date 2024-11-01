import { SimpleGrid } from "@chakra-ui/react";
import { SET_TYPE } from "../../../constants/enhance/set";
import { getPreparedEquipmentGrid } from "../../../services/enhance/equipment";
import SlotButton from "../common/slotButton";
import { useAppDispatch } from "../../../stores/hooks";
import { newInventory } from "../../../stores/userSlice";

export default function PreparedEquipTable({ preset }: { preset: SET_TYPE }) {
  const dispatch = useAppDispatch();

  return (
    <SimpleGrid columns={5} px={1} gap={1}>
      {getPreparedEquipmentGrid(preset).flatMap((row, i) =>
        row.map((item, j) =>
          item ? (
            <SlotButton
              key={`item-${i}-${j}`}
              item={item}
              onClick={() => dispatch(newInventory(item))}
            />
          ) : (
            <div key={`item-${i}-${j}`} />
          )
        )
      )}
    </SimpleGrid>
  );
}
