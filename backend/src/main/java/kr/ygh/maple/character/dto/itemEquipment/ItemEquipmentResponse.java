package kr.ygh.maple.character.dto.itemEquipment;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record ItemEquipmentResponse(String date, String character_gender, String character_class, long preset_no,
                                    DetailResponse[] item_equipment,
                                    DetailResponse[] item_equipment_preset1,
                                    DetailResponse[] item_equipment_preset2,
                                    DetailResponse[] item_equipment_preset3,
                                    DetailResponse[] item_equipment_preset_1,
                                    DetailResponse[] item_equipment_preset_2,
                                    DetailResponse[] item_equipment_preset_3,
                                    TitleResponse title,
                                    DetailResponse[] dragon_equipment,
                                    DetailResponse[] mechanic_equipment) {
}
