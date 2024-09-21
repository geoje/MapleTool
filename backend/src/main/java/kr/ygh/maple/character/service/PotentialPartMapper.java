package kr.ygh.maple.character.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class PotentialPartMapper {

    private final Map<String, String> partMap;

    public PotentialPartMapper() {
        this.partMap = new HashMap<>();
        partMap.put("소울링", "포스실드, 소울링");
        partMap.put("포스실드", "포스실드, 소울링");
        partMap.put("기계 심장", "기계심장");

        List.of("샤이닝로드", "소울슈터", "데스페라도", "에너지소드", "한손검", "한손도끼", "한손둔기", "단검",
                "케인", "완드", "스태프", "ESP리미터", "체인", "매직 건틀렛", "부채", "튜너", "브레스 슈터", "두손검",
                "두손도끼", "창", "폴암", "활", "석궁", "아대", "너클", "건", "듀얼보우건", "핸드캐논", "건틀렛 리볼버",
                "에이션트 보우", "차크람"
        ).forEach(part -> partMap.put(part, "무기"));

        List.of("메달", "메달", "로자리오", "쇠사슬", "마도서", "화살깃", "활골무", "단검용 검집", "블레이드",
                "부적", "리스트밴드", "조준기", "화약통", "보석", "무게추", "문서", "오브", "마법화살", "카드", "여우구슬",
                "마법구슬", "화살촉", "컨트롤러", "매그넘", "노바의 정수", "체스피스", "장약", "무기 전송장치", "매직 윙",
                "패스", "렐릭", "선추", "브레이슬릿", "소울실드", "웨폰벨트", "노리개", "헥스시커"
        ).forEach(part -> partMap.put(part, "보조무기(포스실드, 소울링 제외)"));
    }

    public String map(String part) {
        return Optional.ofNullable(partMap.get(part)).orElse(part);
    }
}
