package kr.ygh.maple.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ygh.maple.domain.character.CharacterItemEquipment;
import kr.ygh.maple.domain.character.CharacterOcid;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ActiveProfiles;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("local")
public class RedisServiceTest {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private RedisService service;

    @Test
    void hashRedisManually() {
        // given
        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
        String key = "hashKey";

        // when
        hashOperations.put(key, "hello", "world");

        Instant oneMinLater = LocalDateTime.now().plusMinutes(1).atZone(ZoneId.systemDefault()).toInstant();
        redisTemplate.expireAt(key, Date.from(oneMinLater));

        // then
        String value = hashOperations.get(key, "hello");
        assertThat(value).isEqualTo("world");

        Map<String, String> entries = hashOperations.entries(key);
        assertThat(entries.keySet()).containsExactly("hello");
        assertThat(entries.values()).containsExactly("world");

        Long size = hashOperations.size(key);
        assertThat(size).isEqualTo(entries.size());
    }

    @Test
    void getNonExists() {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        String ocid = ops.get("character:ocid", "새벽욘");
        System.out.println("ocid = " + ocid);
    }

    @Test
    void putAndGetWithService() {
        String key = "keykey";
        String hashKey = "hahashKeeeey";
        service.put(key, hashKey, new CharacterOcid("test-ocid"));

        Instant oneMinLater = LocalDateTime.now().plusMinutes(1).atZone(ZoneId.systemDefault()).toInstant();
        redisTemplate.expireAt(key, Date.from(oneMinLater));

        CharacterOcid ocid = service.get(key, hashKey, CharacterOcid.class);
        System.out.println("ocid = " + ocid);
    }

    @Test
    void itemEquipmentWork() throws JsonProcessingException {
        CharacterItemEquipment item = service.characterItemEquipment("수빈양").block();

        String itemJson = new ObjectMapper().writeValueAsString(item);

        System.out.println("item = " + item);
        System.out.println("itemJson = " + itemJson);
    }
}
