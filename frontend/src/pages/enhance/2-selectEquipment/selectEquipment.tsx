import { Box, Center, SimpleGrid } from "@chakra-ui/react";
import { useAppSelector } from "../../../stores/hooks";
import SlotButton from "../common/slotButton";
import DeleteButton from "../../../components/deleteButton";

export default function SelectEquipment({
  equipmentIndex,
  setEquipmentIndex,
}: {
  equipmentIndex: number;
  setEquipmentIndex: (value: number) => void;
}) {
  const inventory = useAppSelector((state) => state.user.inventory);

  return (
    <Center>
      <SimpleGrid columns={5} gap={1}>
        {inventory.map((item, i) => (
          <Box position="relative">
            <SlotButton
              key={`item-${i}`}
              item={item.after}
              onClick={() => {
                setEquipmentIndex(equipmentIndex == i ? -1 : i);
              }}
            />
            {equipmentIndex == i && <DeleteButton onClick={() => {}} />}
          </Box>
        ))}
      </SimpleGrid>
    </Center>
  );
}
