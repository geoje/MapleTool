package kr.ygh.maple.service;

import kr.ygh.maple.dto.MapleGgBypass;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@DisplayName("메이플지지")
public class MapleGgServiceTest {

    @Autowired
    MapleGgService service;

    @Test
    @DisplayName("데이터를 요청한다.")
    void requestWork() {
        // given
        String name = "수빈양";
        SoftAssertions softly = new SoftAssertions();

        // when
        MapleGgBypass bypass = service.bypass(name).block();

        // then
        assertThat(bypass).isNotNull();
        softly.assertThat(bypass.characterBasic()).isNotNull();
        softly.assertThat(bypass.characterItemEquipment()).isNotNull();
        softly.assertThat(bypass.unionBasic()).isNotNull();
        softly.assertThat(bypass.unionRaider()).isNotNull();
        softly.assertThat(bypass.unionArtifact()).isNotNull();
        softly.assertAll();

        // output
        System.out.println("character_name=" + bypass.characterBasic().character_name());
        System.out.println("union_preset_description=" + bypass.unionRaider().union_raider_preset_1());
    }
}
