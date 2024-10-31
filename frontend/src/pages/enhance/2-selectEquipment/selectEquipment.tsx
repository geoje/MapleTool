import { Box, Center, Flex, SimpleGrid } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import SlotButton from "../common/slotButton";
import DeleteButton from "../../../components/action/deleteButton";
import { deleteInventory } from "../../../stores/userSlice";
import RequiredText from "../../../components/content/requiredText";

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
        <RequiredText>장비를 가져와주세요.</RequiredText>
      </Flex>
    );
  }

  return (
    <Center>
      <SimpleGrid columns={5} gap={1}>
        {inventory.map((item, i) => (
          <Box key={`item-${i}`} position="relative">
            <SlotButton
              item={item.after}
              colorScheme={equipmentIndex == i ? "blue" : undefined}
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
