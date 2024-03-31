package kr.ygh.maple.dto.character.itemEquipment;

import kr.ygh.maple.entity.Potential;

public record PotentialDto(int position, String name, int value, double probability) {
    public static PotentialDto from(Potential potential) {
        return new PotentialDto(
                potential.getPosition(),
                potential.getName(),
                potential.getValue(),
                potential.getProbability());
    }
}
