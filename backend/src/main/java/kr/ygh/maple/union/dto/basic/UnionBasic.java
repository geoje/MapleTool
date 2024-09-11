package kr.ygh.maple.union.dto.basic;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionBasic(String date, long union_level, String union_grade, long union_artifact_level,
                         long union_artifact_exp, long union_artifact_point) {
}
