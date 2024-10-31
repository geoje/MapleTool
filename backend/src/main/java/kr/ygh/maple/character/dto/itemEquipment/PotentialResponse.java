package kr.ygh.maple.character.dto.itemEquipment;

import kr.ygh.maple.character.entity.Potential;

public record PotentialResponse(String grade, int position, String name, int value, double probability) {

    public PotentialResponse(Potential potential) {
        this(potential.getGrade(), potential.getPosition(),
                potential.getName(), potential.getParam(), potential.getProbability()
        );
    }
}
