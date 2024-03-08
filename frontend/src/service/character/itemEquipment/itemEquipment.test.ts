import { CharacterItemEquipment } from "../../../domain/character/characterItemEquipment";
import ItemEquipmentService from "./itemEquipment";
import sampleJson from "./itemEquipment.sample.json";

const itemEquipment: CharacterItemEquipment = JSON.parse(
  JSON.stringify(sampleJson)
);

test("importSampleJson", () => {
  console.dir(itemEquipment.item_equipment.map((v) => v.item_equipment_slot));
});

test("itemGrid", () => {
  const itemGrid = ItemEquipmentService.itemGrid(itemEquipment, 1);
  const itemNameGrid = itemGrid.map((items) =>
    items.map((item) => item?.item_name)
  );
  console.dir(itemNameGrid);
});
