package kr.ygh.maple.character.dto.itemEquipment.potential;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.Arrays;
import lombok.Getter;

@Getter
public enum PotentialType {
    RED("레드"),
    BLACK("블랙"),
    ADDI("에디"),
    STRANGE("수상"),
    MASTER("장인"),
    ARTISAN("명장"),
    STRANGE_ADDI("수에");

    private final String value;

    PotentialType(String value) {
        this.value = value;
    }

    @JsonCreator
    public static PotentialType getPotentialType(String value) {
        return Arrays.stream(PotentialType.values())
                .filter(type -> type.getValue().equals(value))
                .findAny()
                .orElseThrow(IllegalArgumentException::new);
    }
}
