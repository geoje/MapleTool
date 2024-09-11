package kr.ygh.maple.character.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record Detail(String item_equipment_part, String item_equipment_slot, String item_name,
                     String item_icon, String item_description, String item_shape_name,
                     String item_shape_icon, String item_gender,
                     Option item_total_option,
                     Option item_base_option,
                     String potential_option_grade, String additional_potential_option_grade,
                     String potential_option_1, String potential_option_2,
                     String potential_option_3, String additional_potential_option_1,
                     String additional_potential_option_2, String additional_potential_option_3,
                     long equipment_level_increase,
                     Option item_exceptional_option,
                     Option item_add_option, long growth_exp,
                     long growth_level, String scroll_upgrade, String cuttable_count,
                     String golden_hammer_flag, String scroll_resilience_count,
                     String scroll_upgradeable_count, String soul_name, String soul_option,
                     Option item_etc_option, String starforce,
                     String starforce_scroll_flag,
                     Option item_starforce_option,
                     long special_ring_level, String date_expire) {
}
