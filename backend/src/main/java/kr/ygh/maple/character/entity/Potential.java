package kr.ygh.maple.character.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

@Entity
@Table(indexes = {
        @Index(name = "idx_type_part_grade_level", columnList = "type, part, grade, level")
})
public record Potential(
        @Id long id,
        String type, String part, String grade, int level,
        int position, String name, int param, double probability) {
}
