import { ItemEquipmentDetail } from "../character/itemEquipment/itemEquipment";

export interface ChangeItem {
  before: ItemEquipmentDetail;
  after: ItemEquipmentDetail;
  used: Material[];
}

export interface Material {
  icon: string;
  name: string;
  value: number;
}
