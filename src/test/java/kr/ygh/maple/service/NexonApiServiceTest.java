package kr.ygh.maple.service;

import kr.ygh.maple.dto.character.CharacterBasic;
import kr.ygh.maple.dto.character.CharacterOcid;
import kr.ygh.maple.dto.union.UnionRaider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("local")
@DisplayName("넥슨")
public class NexonApiServiceTest {

    static String ocid = "7a2d5a8b3e84eb08c0cd8c0df0bc4c16";

    @Autowired
    NexonApiService service;

    @Test
    @DisplayName("캐릭터 기본 정보를 요청한다.")
    void basic() {
        // given & when
        CharacterBasic basic = service.characterBasic(ocid).block();

        // then
        assertThat(basic).isNotNull();

        // output
        System.out.println("basic = " + basic);
    }

    @Test
    @DisplayName("캐릭터 명으로 OCID 요청 후 데이터를 요청한다.")
    void any() {
        // given
        String name = "수빈양";

        // when  & then
        CharacterOcid ocid = service.characterOcid(name).block();
        assertThat(ocid).isNotNull();
        UnionRaider data = service.unionRaider(ocid.ocid()).block();
        assertThat(data).isNotNull();

        // output
        System.out.println("data = " + data);
    }
}
