package kr.ygh.maple.union.dto.artifact;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Artifact(String date, Effect[] union_artifact_effect,
                       Crystal[] union_artifact_crystal, long union_artifact_remain_ap) {
}
