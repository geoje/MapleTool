package kr.ygh.maple.union.entity.raider;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionRaider(String date, String[] union_raider_stat, String[] union_occupied_stat,
                          StatResponse[] union_inner_stat, BlockResponse[] union_block,
                          int use_preset_no, PresetResponse union_raider_preset_1,
                          PresetResponse union_raider_preset_2, PresetResponse union_raider_preset_3,
                          PresetResponse union_raider_preset_4, PresetResponse union_raider_preset_5
) {
}
