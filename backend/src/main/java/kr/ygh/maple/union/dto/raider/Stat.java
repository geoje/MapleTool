package kr.ygh.maple.union.dto.raider;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Stat(String stat_field_id, String stat_field_effect) {
}
