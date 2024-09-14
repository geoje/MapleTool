package kr.ygh.maple.character.dto.itemEquipment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Title(String title_name, String title_icon, String title_description,
                    String date_expire, String date_option_expire) {
}
