package kr.ygh.maple.domain.union.subset;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionRaiderStat(String stat_field_id, String stat_field_effect) {
}
