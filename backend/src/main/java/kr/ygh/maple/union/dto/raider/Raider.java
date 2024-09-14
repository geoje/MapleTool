package kr.ygh.maple.union.dto.raider;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record Raider(String date, String[] union_raider_stat, String[] union_occupied_stat,
                     Stat[] union_inner_stat, Block[] union_block,
                     int use_preset_no, Preset union_raider_preset_1,
                     Preset union_raider_preset_2, Preset union_raider_preset_3,
                     Preset union_raider_preset_4, Preset union_raider_preset_5
) {
}
