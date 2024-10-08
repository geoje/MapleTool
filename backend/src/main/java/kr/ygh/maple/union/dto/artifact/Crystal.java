package kr.ygh.maple.union.dto.artifact;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Crystal(String name, String validity_flag, String date_expire, long level,
                      String crystal_option_name_1, String crystal_option_name_2,
                      String crystal_option_name_3) {
}
