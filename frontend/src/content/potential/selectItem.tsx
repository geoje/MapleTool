import { Grid, GridItem, IconButton, Image, Tooltip } from "@chakra-ui/react";
import { CharacterItemEquipment } from "../../domain/character/characterItemEquipment";
import ItemEquipmentService from "../../service/character/itemEquipment/itemEquipment";
import ItemToolTip from "./itemToolTip";
import { POTENTIAL_GRADE_BORDER_COLOR } from "../../service/character/itemEquipment/itemEquipmentConstant";

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
                  placement="right-start"
                  color="white"
                  background="blackAlpha.800"
                  p={0}
                  label={<ItemToolTip item={item} />}
                >
                  <IconButton
                    aria-label={"item-" + i + j}
                    borderWidth={1}
                    borderColor={
                      appear
                        ? POTENTIAL_GRADE_BORDER_COLOR[
                            ItemEquipmentService.maxPotentialGradeIndex(item)
                          ]
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
                </Tooltip>
              )}
            </GridItem>
          );
        })
      )}
    </Grid>
  );
}
