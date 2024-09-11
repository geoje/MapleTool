package kr.ygh.maple.character.dto.basic;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record BasicResponse(String date, String character_name, String world_name, String character_gender,
                            String character_class, String character_class_level, long character_level,
                            long character_exp, String character_exp_rate, String character_guild_name,
                            String character_image) {
}
