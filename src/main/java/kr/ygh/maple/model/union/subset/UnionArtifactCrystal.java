package kr.ygh.maple.model.union.subset;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionArtifactCrystal(String name, String validity_flag, String data_expire, long level,
                                   String crystal_option_name_1, String crystal_option_name_2,
                                   String crystal_option_name_3) {
}
