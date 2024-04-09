import {
  Flex,
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
  onSelectedSelect,
  onDelete,
}: {
  deleteModeOn: boolean;
  selectedIndex: number;
  onSelect: (index: number) => void;
  onSelectedSelect: () => void;
  onDelete: (index: number) => void;
}) {
  const inventory = useAppSelector((state) => state.user.inventory);

  const iconColor = useColorModeValue("white", "black");

  return (
    <Flex justify="center" wrap="wrap" gap={1}>
      {inventory.map((item, i) => (
        <GridItem key={"item-" + i} position="relative">
          <ItemButton item={item} onClick={() => onSelect(i)} />
          {!deleteModeOn && selectedIndex == i && (
            <IconButton
              aria-label="selected"
              position="absolute"
              left={0}
              opacity={0.6}
              colorScheme="blue"
              icon={<FaCheck size={24} color={iconColor} />}
              onClick={onSelectedSelect}
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
    </Flex>
  );
}
