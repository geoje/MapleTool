import { Grid, GridItem, IconButton, Image } from "@chakra-ui/react";
import { CharacterItemEquipment } from "../../domain/character/characterItemEquipment";
import ItemEquipmentService from "../../service/character/itemEquipment/itemEquipment";

export default function SelectItem({
  characterItemEquipment,
}: {
  characterItemEquipment?: CharacterItemEquipment;
}) {
  const itemGrid = ItemEquipmentService.itemGrid(
    characterItemEquipment?.item_equipment ?? []
  );

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={1}>
      {itemGrid.flatMap((items, i) =>
        items.flatMap((item, j) => (
          <GridItem key={"item-" + i + j}>
            {item && (
              <IconButton
                aria-label={"item-" + i + j}
                icon={<Image src={item?.item_icon} />}
              />
            )}
          </GridItem>
        ))
      )}
    </Grid>
  );
}
