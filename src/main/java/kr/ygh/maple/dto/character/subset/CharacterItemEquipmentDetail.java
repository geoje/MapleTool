package kr.ygh.maple.dto.character.subset;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record CharacterItemEquipmentDetail(String item_equipment_part, String item_equipment_slot, String item_name,
                                           String item_icon, String item_description, String item_shape_name,
                                           String item_shape_icon, String item_gender,
                                           CharacterItemEquipmentOption item_total_option,
                                           CharacterItemEquipmentOption item_base_option,
                                           String potential_option_grade, String additional_potential_option_grade,
                                           String potential_option_1, String potential_option_2,
                                           String potential_option_3, String additional_potential_option_1,
                                           String additional_potential_option_2, String additional_potential_option_3,
                                           long equipment_level_increase,
                                           CharacterItemEquipmentOption item_exceptional_option,
                                           CharacterItemEquipmentOption item_add_option, long growth_exp,
                                           long growth_level, String scroll_upgrade, String cuttable_count,
                                           String golden_hammer_flag, String scroll_resilience_count,
                                           String scroll_upgradeable_count, String soul_name, String soul_option,
                                           CharacterItemEquipmentOption item_etc_option, String starforce,
                                           String starforce_scroll_flag,
                                           CharacterItemEquipmentOption item_starforce_option,
                                           long special_ring_level, String date_expire) {
}
