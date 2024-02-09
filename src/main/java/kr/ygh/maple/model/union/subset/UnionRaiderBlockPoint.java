package kr.ygh.maple.model.union.subset;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionRaiderBlockPoint(long x, long y) {
}
