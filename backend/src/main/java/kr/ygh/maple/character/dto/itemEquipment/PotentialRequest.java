package kr.ygh.maple.character.dto.itemEquipment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record PotentialRequest(
        @NotBlank(message = "타입은 공백일 수 없습니다.") String type,
        @NotBlank(message = "등급은 공백일 수 없습니다.") String grade,
        @NotBlank(message = "분류은 공백일 수 없습니다.") String part,
        @NotNull(message = "레벨은 필수 입력 값 입니다.")
        @PositiveOrZero(message = "레벨은 음수일 수 없습니다.") Integer level) {
}
