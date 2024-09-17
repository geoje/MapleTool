package kr.ygh.maple.character.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(indexes = {
        @Index(name = "idx_type_grade_part_level", columnList = "type, grade, part, level")
})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Potential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String type;
    private String grade;
    private String part;
    private int level;

    private int position;
    private String name;
    private int param;
    private double probability;
}
