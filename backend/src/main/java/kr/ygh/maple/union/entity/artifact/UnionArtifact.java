package kr.ygh.maple.union.entity.artifact;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionArtifact(String date, EffectResponse[] union_artifact_effect,
                            CrystalResponse[] union_artifact_crystal, long union_artifact_remain_ap) {
}
