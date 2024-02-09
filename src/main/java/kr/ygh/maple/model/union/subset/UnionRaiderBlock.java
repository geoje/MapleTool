package kr.ygh.maple.model.union.subset;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionRaiderBlock(String block_type, String block_class, String block_level,
                               UnionRaiderBlockPoint block_control_point, UnionRaiderBlockPoint[] block_position) {
}
