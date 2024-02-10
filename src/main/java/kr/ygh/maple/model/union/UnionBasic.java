package kr.ygh.maple.model.union;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionBasic(String date, long union_level, String union_grade, long artifact_level,
                         long artifact_exp, long artifact_point) {
}
