import { Grid, GridItem, IconButton, Image, Tooltip } from "@chakra-ui/react";
import { CharacterItemEquipment } from "../../domain/character/characterItemEquipment";
import ItemEquipmentService from "../../service/character/itemEquipment/itemEquipment";
import ItemToolTip from "./itemToolTip";

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
                <Tooltip
                  color="white"
                  background="blackAlpha.800"
                  w={64}
                  p={0}
                  borderRadius={4}
                  label={<ItemToolTip item={item} />}
                >
                  <IconButton
                    aria-label={"item-" + i + j}
                    borderWidth={1}
                    borderColor={
                      appear
                        ? ItemEquipmentService.maxPotential(item)?.BORDER_COLOR
                        : undefined
                    }
                    icon={
                      <Image
                        src={item?.item_icon}
                        opacity={appear ? 1 : 0.1}
                        style={{ imageRendering: "pixelated" }}
                      />
                    }
                  />
                </Tooltip>
              )}
            </GridItem>
          );
        })
      )}
    </Grid>
  );
}
