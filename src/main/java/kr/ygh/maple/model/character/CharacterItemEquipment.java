package kr.ygh.maple.model.character;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import kr.ygh.maple.model.character.subset.CharacterItemEquipmentDetail;
import kr.ygh.maple.model.character.subset.CharacterItemEquipmentTitle;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record CharacterItemEquipment(String date, String character_gender, String character_class, long preset_no,
                                     CharacterItemEquipmentDetail item_equipment,
                                     CharacterItemEquipmentDetail item_equipment_preset_1,
                                     CharacterItemEquipmentDetail item_equipment_preset_2,
                                     CharacterItemEquipmentDetail item_equipment_preset_3,
                                     CharacterItemEquipmentTitle title,
                                     CharacterItemEquipmentDetail dragon_equipment,
                                     CharacterItemEquipmentDetail mechanic_equipment) {
}
