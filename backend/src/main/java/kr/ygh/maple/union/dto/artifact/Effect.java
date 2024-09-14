package kr.ygh.maple.union.dto.artifact;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Effect(String name, long level) {
}
