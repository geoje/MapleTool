package kr.ygh.maple.character.dto.itemEquipment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record PotentialRequest(
        @NotBlank(message = "필수 입력 값 입니다.") String type,
        @NotBlank(message = "필수 입력 값 입니다.") String part,
        @NotNull(message = "필수 입력 값 입니다.")
        @PositiveOrZero(message = "0 또는 양수를 입력해 주세요.") Integer level) {

    public String key() {
        return String.join(":", type, part, level.toString());
    }
}
