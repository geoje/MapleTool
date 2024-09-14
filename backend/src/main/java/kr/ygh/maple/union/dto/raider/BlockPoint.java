package kr.ygh.maple.union.dto.raider;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record BlockPoint(long x, long y) {
}
