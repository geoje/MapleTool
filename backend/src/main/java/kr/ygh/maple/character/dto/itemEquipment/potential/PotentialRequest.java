package kr.ygh.maple.character.dto.itemEquipment.potential;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record PotentialRequest(
        @NotNull(message = "올바르지 않은 타입 입니다.") PotentialType type,
        @NotNull(message = "올바르지 않은 등급 입니다.") PotentialGrade grade,
        @NotNull(message = "올바르지 않은 파트 입니다.") PotentialPart part,
        @NotNull(message = "필수 입력 값 입니다.")
        @PositiveOrZero(message = "0 또는 양수를 입력해 주세요.") Integer level) {
}
