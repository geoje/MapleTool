package kr.ygh.maple.union.dto.basic;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Basic(String date, long union_level, String union_grade, long union_artifact_level,
                    long union_artifact_exp, long union_artifact_point) {
}
