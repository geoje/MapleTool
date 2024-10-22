import { ItemEquipmentDetail } from "../character/itemEquipment/itemEquipment";

export interface EnhancedItem {
  before: ItemEquipmentDetail;
  after: ItemEquipmentDetail;
  used: Material[];
}

export interface Material {
  name: string;
  value: number;
}
