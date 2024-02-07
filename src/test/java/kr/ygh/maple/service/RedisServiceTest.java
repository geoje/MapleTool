package kr.ygh.maple.service;

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
    private RedisService redisService;

    @Test
    void testHashRedis() {
        // given
        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
        String key = "hashKey";

        // when
        hashOperations.put(key, "hello", "world");

        Instant tomorrow = LocalDateTime.now().plusMinutes(1).atZone(ZoneId.systemDefault()).toInstant();
        redisTemplate.expireAt(key, Date.from(tomorrow));

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
}
