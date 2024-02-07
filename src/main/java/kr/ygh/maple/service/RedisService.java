package kr.ygh.maple.service;

import kr.ygh.maple.model.character.CharacterOcid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class RedisService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private NexonApiService nexonApiService;
    @Autowired
    private MapleGgService mapleGgService;

    public Mono<CharacterOcid> ocid(String name) {
        // Return redis data if exists
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        String json = ops.get("character:ocid", name);
        if (json != null) return Mono.just(CharacterOcid.from(json));

        // Request to maple.gg if time is between 0 and 1 am
        if (NexonApiService.isCollectingTime()) {
            // return Maplegg service response data
        }

        // Request to Nexon
        CharacterOcid ocid = nexonApiService.ocid(name).block();
        assert ocid != null;
        ops.put("character:ocid", name, ocid.toString());
        return Mono.just(ocid);
    }
}
