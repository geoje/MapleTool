package kr.ygh.maple.union.dto.raider;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Preset(String[] union_raider_stat, String[] union_occupied_stat,
                     Stat[] union_inner_stat, Block[] union_block) {
}
