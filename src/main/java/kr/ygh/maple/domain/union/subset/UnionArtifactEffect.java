package kr.ygh.maple.domain.union.subset;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionArtifactEffect(String name, long level) {
}
