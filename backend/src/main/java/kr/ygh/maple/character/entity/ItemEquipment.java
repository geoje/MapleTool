package kr.ygh.maple.character.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record ItemEquipment(String date, String character_gender, String character_class, long preset_no,
                            Detail[] item_equipment,
                            Detail[] item_equipment_preset1,
                            Detail[] item_equipment_preset2,
                            Detail[] item_equipment_preset3,
                            Detail[] item_equipment_preset_1,
                            Detail[] item_equipment_preset_2,
                            Detail[] item_equipment_preset_3,
                            Title title,
                            Detail[] dragon_equipment,
                            Detail[] mechanic_equipment) {
}
