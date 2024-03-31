package kr.ygh.maple.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ygh.maple.dto.character.CharacterOcid;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("local")
@DisplayName("레디스")
public class RedisServiceTest {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private RedisService service;

    @Test
    @DisplayName("데이터를 입력한다.")
    void put() throws JsonProcessingException {
        // given
        String key = "put-test-key";
        String hashKey = "test-hash-key";
        String ocid = "7a2d5a8b3e84eb08c0cd8c0df0bc4c16";

        // when
        service.put(key, hashKey, new CharacterOcid(ocid));
        String result = (String) redisTemplate.opsForHash().get(key, hashKey);
        CharacterOcid parsed = new ObjectMapper().readValue(result, CharacterOcid.class);

        // then
        assertThat(parsed.ocid()).isEqualTo(ocid);
        redisTemplate.delete(key);
    }

    @Test
    @DisplayName("데이터를 조회한다.")
    void get() {
        // given
        String key = "get-test-key";
        String hashKey = "test-hash-key";
        String ocid = "7a2d5a8b3e84eb08c0cd8c0df0bc4c16";
        String value = "{\"ocid\":\"%s\"}".formatted(ocid);

        // when
        redisTemplate.opsForHash().put(key, hashKey, value);
        CharacterOcid characterOcid = service.get(key, hashKey, CharacterOcid.class);

        // then
        assertThat(characterOcid.ocid()).isEqualTo(ocid);
        redisTemplate.delete(key);
    }
}
