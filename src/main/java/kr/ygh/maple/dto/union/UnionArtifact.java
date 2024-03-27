package kr.ygh.maple.dto.union;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import kr.ygh.maple.dto.union.subset.UnionArtifactCrystal;
import kr.ygh.maple.dto.union.subset.UnionArtifactEffect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionArtifact(String date, UnionArtifactEffect[] union_artifact_effect,
                            UnionArtifactCrystal[] union_artifact_crystal, long union_artifact_remain_ap) {
}
