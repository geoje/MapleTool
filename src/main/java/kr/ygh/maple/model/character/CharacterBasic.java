package kr.ygh.maple.model.character;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record CharacterBasic(String date, String character_name, String world_name, String character_gender,
                             String character_class, String character_class_level, long character_level,
                             long character_exp, String character_exp_rate, String character_guild_name,
                             String character_image) {

    public static CharacterBasic from(String json) {
        try {
            return new ObjectMapper().readValue(json, CharacterBasic.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String toString() {
        try {
            return new ObjectMapper().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
