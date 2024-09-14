package kr.ygh.maple.character.dto.ocid;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record Ocid(String ocid) {
}
