package kr.ygh.maple.service;

import kr.ygh.maple.dto.character.CharacterBasic;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("레디스")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
class RedisServiceTest {

    @Autowired
    RedisService redisService;

    @Test
    @Disabled
    @DisplayName("캐릭터 기본정보를 요청한다.")
    void characterBasic() {
        // given & when
        CharacterBasic basic = redisService.characterBasic("수빈양").block();

        // then
        assertThat(basic).isNotNull();

        // print
        System.out.println(basic);
    }
}