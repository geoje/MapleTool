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
        items.flatMap((item, j) => {
          const appear =
            preset == 1 ||
            JSON.stringify(item) != JSON.stringify(defaultItemGrid[i][j]);
          return (
            <GridItem key={"item-" + i + j}>
              {item && (
                <IconButton
                  aria-label={"item-" + i + j}
                  borderWidth={1}
                  borderColor={
                    appear
                      ? ItemEquipmentService.maxPotentialGradeColor(item) +
                        ".400"
                      : undefined
                  }
                  icon={
                    appear ? (
                      <Image
                        src={item?.item_icon}
                        style={{ imageRendering: "pixelated" }}
                      />
                    ) : undefined
                  }
                />
              )}
            </GridItem>
          );
        })
      )}
    </Grid>
  );
}
