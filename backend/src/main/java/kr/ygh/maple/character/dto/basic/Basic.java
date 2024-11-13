package kr.ygh.maple.character.dto.basic;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import kr.ygh.maple.character.entity.CharacterBasic;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Basic(String date, String character_name, String world_name, String character_gender,
                    String character_class, String character_class_level, long character_level,
                    long character_exp, String character_exp_rate, String character_guild_name,
                    String character_image) {

    public static Basic from(CharacterBasic entity) {
        return new Basic(entity.getDate(), entity.getCharacterName(), entity.getWorldName(),
                entity.getCharacterGender(), entity.getCharacterClass(), entity.getCharacterClassLevel(),
                entity.getCharacterLevel(), entity.getCharacterExp(), entity.getCharacterExpRate(),
                entity.getCharacterGuildName(), entity.getCharacterImage());
    }

    public CharacterBasic toEntity() {
        return new CharacterBasic(character_name, date, world_name, character_gender, character_class,
                character_class_level, character_level, character_exp, character_exp_rate,
                character_guild_name, character_image);
    }
}
