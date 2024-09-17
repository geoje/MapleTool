package kr.ygh.maple.character.dto.itemEquipment;

import kr.ygh.maple.character.entity.Potential;

public record PotentialResponse(int position, String name, int value, double probability) {

    public PotentialResponse(Potential potential) {
        this(potential.getPosition(), potential.getName(), potential.getParam(), potential.getProbability());
    }
}
