import { Grid, GridItem } from "@chakra-ui/react";
import { useAppSelector } from "../../reducer/hooks";
import ItemButton from "./import/itemButton";
import { CharacterItemEquipmentDetail } from "../../domain/character/characterItemEquipment";

export default function SelectItem({
  onClick,
}: {
  onClick?: (item: CharacterItemEquipmentDetail) => void;
}) {
  const inventory = useAppSelector((state) => state.user.inventory);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={1}>
      {inventory.map((item, i) => (
        <GridItem key={"item-" + i}>
          <ItemButton
            item={item}
            onClick={onClick ? () => onClick(item) : undefined}
          />
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
