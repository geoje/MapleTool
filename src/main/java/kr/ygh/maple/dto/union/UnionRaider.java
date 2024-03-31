package kr.ygh.maple.dto.union;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import kr.ygh.maple.dto.union.subset.UnionRaiderBlock;
import kr.ygh.maple.dto.union.subset.UnionRaiderPreset;
import kr.ygh.maple.dto.union.subset.UnionRaiderStat;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionRaider(String date, String[] union_raider_stat, String[] union_occupied_stat,
                          UnionRaiderStat[] union_inner_stat, UnionRaiderBlock[] union_block,
                          int use_preset_no, UnionRaiderPreset union_raider_preset_1,
                          UnionRaiderPreset union_raider_preset_2, UnionRaiderPreset union_raider_preset_3,
                          UnionRaiderPreset union_raider_preset_4, UnionRaiderPreset union_raider_preset_5
) {
}
