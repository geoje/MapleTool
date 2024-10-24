import { Box, Center, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import SlotButton from "../common/slotButton";
import DeleteButton from "../../../components/deleteButton";
import { deleteInventory } from "../../../stores/userSlice";

export default function SelectEquipment({
  equipmentIndex,
  setEquipmentIndex,
}: {
  equipmentIndex: number;
  setEquipmentIndex: (value: number) => void;
}) {
  const dispatch = useAppDispatch();
  const inventory = useAppSelector((state) => state.user.inventory);

  if (!inventory.length) {
    return (
      <Flex justify="center" pt="1px">
        <Text size="md" opacity={0.6}>
          장비를 가져와주세요.
        </Text>
      </Flex>
    );
  }

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
            {equipmentIndex == i && (
              <DeleteButton
                onClick={() => {
                  setEquipmentIndex(-1);
                  dispatch(deleteInventory(i));
                }}
              />
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Center>
  );
}
