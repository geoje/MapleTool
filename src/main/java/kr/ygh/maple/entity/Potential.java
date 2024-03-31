package kr.ygh.maple.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Potential {

    @Id
    @GeneratedValue
    private long id;

    private String grade;
    private String part;
    private int level;

    private int position;
    private String name;
    private double probability;
}
