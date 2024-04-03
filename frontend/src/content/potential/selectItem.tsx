import {
  Flex,
  Grid,
  GridItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "../../reducer/hooks";
import ItemButton from "./import/itemButton";
import { CharacterItemEquipmentDetail } from "../../domain/character/characterItemEquipment";

export default function SelectItem({
  deleteModeOn,
  onSelect,
  onDelete,
}: {
  deleteModeOn: boolean;
  onSelect: (item: CharacterItemEquipmentDetail) => void;
  onDelete: (index: number) => void;
}) {
  const inventory = useAppSelector((state) => state.user.inventory);

  const deleteIconColor = useColorModeValue("white", "black");

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={1}>
      {inventory.map((item, i) => (
        <GridItem key={"item-" + i} position="relative">
          <ItemButton
            item={item}
            onClick={onSelect ? () => onSelect(item) : undefined}
          />
          {deleteModeOn && (
            <IconButton
              aria-label="delete"
              position="absolute"
              left={0}
              opacity={0.6}
              colorScheme="red"
              icon={<IoClose size={24} color={deleteIconColor} />}
              onClick={() => onDelete(i)}
            />
          )}
        </GridItem>
      ))}
      {new Array(5 - (inventory.length % 5)).fill(undefined).map((_, i) => (
        <GridItem key={"item-empty-" + i}>
          <ItemButton />
        </GridItem>
      ))}
    </Grid>
  );
}
