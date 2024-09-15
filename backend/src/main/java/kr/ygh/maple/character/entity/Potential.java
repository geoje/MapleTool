package kr.ygh.maple.character.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

@Entity
@Table(indexes = {
        @Index(name = "idx_type_grade_part_level", columnList = "type, grade, part, level")
})
public record Potential(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) long id,
        String type, String grade, String part, int level,
        int position, String name, int param, double probability) {
}
