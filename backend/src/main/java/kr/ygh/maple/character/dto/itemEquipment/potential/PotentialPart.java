package kr.ygh.maple.character.dto.itemEquipment.potential;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.Arrays;
import java.util.Set;
import lombok.Getter;

@Getter
public enum PotentialPart {
    WEAPON("무기", Set.of("샤이닝로드", "소울슈터", "데스페라도", "에너지소드", "한손검", "한손도끼", "한손둔기", "단검",
            "케인", "완드", "스태프", "ESP리미터", "체인", "매직 건틀렛", "부채", "튜너", "브레스 슈터", "두손검",
            "두손도끼", "창", "폴암", "활", "석궁", "아대", "너클", "건", "듀얼보우건", "핸드캐논", "건틀렛 리볼버",
            "에이션트 보우", "차크람"
    )),
    EMBLEM("엠블렘", Set.of()),
    SECONDARY_WEAPON("보조무기(포스실드, 소울링 제외)",
            Set.of("메달", "로자리오", "쇠사슬", "마도서", "화살깃", "활골무", "단검용 검집", "블레이드",
                    "부적", "리스트밴드", "조준기", "화약통", "보석", "무게추", "문서", "오브", "마법화살", "카드", "여우구슬",
                    "마법구슬", "화살촉", "컨트롤러", "매그넘", "노바의 정수", "체스피스", "장약", "무기 전송장치", "매직 윙",
                    "패스", "렐릭", "선추", "브레이슬릿", "소울실드", "웨폰벨트", "노리개", "헥스시커"
            )),
    FORCE_SHIELD_SOUL_RING("포스실드, 소울링", Set.of("포스실드", "소울링")),
    SHIELD("방패", Set.of()),
    HAT("모자", Set.of()),
    TOP("상의", Set.of()),
    OVERALL("한벌옷", Set.of()),
    BOTTOM("하의", Set.of()),
    SHOES("신발", Set.of()),
    GLOVES("장갑", Set.of()),
    CAPE("망토", Set.of()),
    BELT("벨트", Set.of()),
    SHOULDER_ACCESSORY("어깨장식", Set.of()),
    FACE_ACCESSORY("얼굴장식", Set.of()),
    EYE_ACCESSORY("눈장식", Set.of()),
    EARRINGS("귀고리", Set.of()),
    RING("반지", Set.of()),
    PENDANT("펜던트", Set.of()),
    MECHANICAL_HEART("기계심장", Set.of("기계 심장"));

    private final String group;
    private final Set<String> sources;

    PotentialPart(String group, Set<String> sources) {
        this.group = group;
        this.sources = sources;
    }

    @JsonCreator
    public static PotentialPart from(String source) {
        return Arrays.stream(PotentialPart.values())
                .filter(part -> part.getGroup().equals(source) || part.getSources().contains(source))
                .findAny()
                .orElseThrow(IllegalArgumentException::new);
    }
}
