package kr.ygh.maple.boss.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record BossContent(
        String content_name,
        String difficulty,
        String cycle,
        long list_order_no,
        String registration_flag,
        String complete_flag
) {
}
