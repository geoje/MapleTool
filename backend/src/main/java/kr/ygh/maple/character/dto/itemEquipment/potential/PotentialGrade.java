package kr.ygh.maple.character.dto.itemEquipment.potential;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.Arrays;
import lombok.Getter;

@Getter
public enum PotentialGrade {
    RARE("레어"),
    EPIC("에픽"),
    UNIQUE("유니크"),
    LEGENDARY("레전드리");

    private final String value;

    PotentialGrade(String value) {
        this.value = value;
    }

    @JsonCreator
    public static PotentialGrade getPotentialType(String value) {
        return Arrays.stream(PotentialGrade.values())
                .filter(type -> type.getValue().equals(value))
                .findAny()
                .orElseThrow(IllegalArgumentException::new);
    }

    // TODO; Check exception on converting
}
