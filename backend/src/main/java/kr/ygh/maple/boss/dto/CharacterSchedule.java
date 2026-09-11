package kr.ygh.maple.boss.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record CharacterSchedule(
        String date,
        String character_name,
        BossContent[] boss_contents
) {
}
