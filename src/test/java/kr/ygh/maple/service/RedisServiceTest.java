package kr.ygh.maple.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("local")
public class RedisServiceTest {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private RedisService redisService;

    @Test
    void getNonExists() {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        String ocid = ops.get("character:ocid", "새벽욘");
        System.out.println("ocid = " + ocid);
    }
}
