package kr.ygh.maple.common.dto;

import jakarta.validation.constraints.NotBlank;

public record NameRequest(
        @NotBlank(message = "이름은 공백일 수 없습니다.") String name
) {
}
