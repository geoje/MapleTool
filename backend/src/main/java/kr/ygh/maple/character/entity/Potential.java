package kr.ygh.maple.character.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public record Potential(
        @Id long id,
        String type, String part, String grade, int level,
        int position, String name, int param, double probability) {
}
