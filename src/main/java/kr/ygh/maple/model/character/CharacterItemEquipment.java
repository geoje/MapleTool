package kr.ygh.maple.model.character;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record CharacterItemEquipment(String date, String character_gender, String character_class, long preset_no) {
}
