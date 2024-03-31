package kr.ygh.maple.dto.union.subset;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionRaiderPreset(String[] union_raider_stat, String[] union_occupied_stat,
                                UnionRaiderStat[] union_inner_stat, UnionRaiderBlock[] union_block) {
}
