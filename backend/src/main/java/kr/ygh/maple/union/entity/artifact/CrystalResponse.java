package kr.ygh.maple.union.entity.artifact;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record CrystalResponse(String name, String validity_flag, String date_expire, long level,
                              String crystal_option_name_1, String crystal_option_name_2,
                              String crystal_option_name_3) {
}
