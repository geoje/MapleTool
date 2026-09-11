package kr.ygh.maple.character.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CharacterBasic {

    @Id
    private String characterName;
    private String date;
    private String worldName;
    private String characterGender;
    private String characterClass;
    private String characterClassLevel;
    private long characterLevel;
    private long characterExp;
    private String characterExpRate;
    private String characterGuildName;
    @Column(length = 1000)
    private String characterImage;
}
