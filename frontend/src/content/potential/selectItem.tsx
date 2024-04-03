import {
  Grid,
  GridItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "../../reducer/hooks";
import ItemButton from "./import/itemButton";

export default function SelectItem({
  deleteModeOn,
  selectedIndex,
  onSelect,
  onDelete,
}: {
  deleteModeOn: boolean;
  selectedIndex: number;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
}) {
  const inventory = useAppSelector((state) => state.user.inventory);

  const iconColor = useColorModeValue("white", "black");

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={1}>
      {inventory.map((item, i) => (
        <GridItem key={"item-" + i} position="relative">
          <ItemButton
            item={item}
            onClick={onSelect ? () => onSelect(i) : undefined}
          />
          {!deleteModeOn && selectedIndex == i && (
            <IconButton
              aria-label="selected"
              position="absolute"
              left={0}
              opacity={0.6}
              colorScheme="blue"
              icon={<FaCheck size={24} color={iconColor} />}
            />
          )}
          {deleteModeOn && (
            <IconButton
              aria-label="delete"
              position="absolute"
              left={0}
              opacity={0.6}
              colorScheme="red"
              icon={<IoClose size={24} color={iconColor} />}
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
