import { Grid, GridItem, IconButton, Image } from "@chakra-ui/react";
import { CharacterItemEquipment } from "../../domain/character/characterItemEquipment";
import ItemEquipmentService from "../../service/character/itemEquipment/itemEquipment";

export default function SelectItem({
  characterItemEquipment,
  preset,
}: {
  characterItemEquipment?: CharacterItemEquipment;
  preset: number;
}) {
  if (!characterItemEquipment) return <></>;

  const defaultItemGrid = ItemEquipmentService.itemGrid(
    characterItemEquipment,
    0
  );

  const presetItemGrid = ItemEquipmentService.itemGrid(
    characterItemEquipment,
    preset
  );

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={1}>
      {presetItemGrid.flatMap((items, i) =>
        items.flatMap((item, j) => (
          <GridItem key={"item-" + i + j}>
            {item && (
              <IconButton
                aria-label={"item-" + i + j}
                icon={
                  preset == 1 ||
                  JSON.stringify(item) !=
                    JSON.stringify(defaultItemGrid[i][j]) ? (
                    <Image src={item?.item_icon} />
                  ) : undefined
                }
              />
            )}
          </GridItem>
        ))
      )}
    </Grid>
  );
}
