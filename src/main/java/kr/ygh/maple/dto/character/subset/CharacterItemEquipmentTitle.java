package kr.ygh.maple.dto.character.subset;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record CharacterItemEquipmentTitle(String title_name, String title_icon, String title_description,
                                          String date_expire, String date_option_expire) {
}
