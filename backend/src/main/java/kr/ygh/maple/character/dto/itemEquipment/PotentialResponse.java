package kr.ygh.maple.character.dto.itemEquipment;

import kr.ygh.maple.character.entity.Potential;

public record PotentialResponse(int position, String name, int value, double probability) {
    public static PotentialResponse from(Potential potential) {
        return new PotentialResponse(
                potential.getPosition(),
                potential.getName(),
                potential.getParam(),
                potential.getProbability());
    }
}
