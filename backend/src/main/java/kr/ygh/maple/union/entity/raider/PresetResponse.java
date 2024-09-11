package kr.ygh.maple.union.entity.raider;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record PresetResponse(String[] union_raider_stat, String[] union_occupied_stat,
                             StatResponse[] union_inner_stat, BlockResponse[] union_block) {
}
