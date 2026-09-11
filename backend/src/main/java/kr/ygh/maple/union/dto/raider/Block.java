package kr.ygh.maple.union.dto.raider;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Block(String block_type, String block_class, String block_level,
                    BlockPoint block_control_point, BlockPoint[] block_position) {
}
