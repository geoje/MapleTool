package kr.ygh.maple.common.dto;

import jakarta.validation.constraints.NotBlank;

public record NameRequest(
        @NotBlank(message = "필수 입력 값 입니다.") String name
) {
}
