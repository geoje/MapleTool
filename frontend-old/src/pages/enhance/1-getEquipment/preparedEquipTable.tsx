import { SimpleGrid } from "@chakra-ui/react";
import { SET_TYPE } from "../../../constants/enhance/set";
import { getPreparedEquipmentGrid } from "../../../services/enhance/equipment";
import SlotButton from "../common/slotButton";
import { useAppDispatch } from "../../../stores/hooks";
import { newInventory } from "../../../stores/userSlice";

export default function PreparedEquipTable({
  preset,
  onItemClick,
}: {
  preset: SET_TYPE;
  onItemClick: () => void;
}) {
  const dispatch = useAppDispatch();
  const flexible = ![
    SET_TYPE.ROOTABIS,
    SET_TYPE.ABSOLABS,
    SET_TYPE.ARCANEUMBRA,
    SET_TYPE.ETERNAL,
  ].includes(preset);

  return (
    <SimpleGrid
      display={{ base: flexible ? "flex" : "grid", md: "grid" }}
      columns={5}
      px={1}
      gap={1}
      flexWrap="wrap"
      justifyContent="center"
    >
      {getPreparedEquipmentGrid(preset).flatMap((row, i) =>
        row.map((item, j) =>
          item ? (
            <SlotButton
              key={`item-${i}-${j}`}
              item={item}
              onClick={() => {
                dispatch(newInventory(item));
                onItemClick();
              }}
            />
          ) : (
            <div key={`item-${i}-${j}`} />
          )
        )
      )}
    </SimpleGrid>
  );
}
