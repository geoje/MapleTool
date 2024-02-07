package kr.ygh.maple.service;

import kr.ygh.maple.model.MapleGgBypass;
import kr.ygh.maple.model.character.CharacterBasic;
import kr.ygh.maple.model.character.CharacterOcid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
public class RedisService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private NexonApiService nexonApiService;
    @Autowired
    private MapleGgService mapleGgService;

    public void getAndSaveMapleGgBypass(String name) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();

        MapleGgBypass bypass = mapleGgService.bypass(name).block();
        assert bypass != null;
        ops.put("character:basic", name, bypass.characterBasic().toString());
    }

    public Mono<CharacterOcid> ocid(String name) {
        // Return redis data if exists
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        String json = ops.get("character:ocid", name);
        if (json != null) return Mono.just(CharacterOcid.from(json));

        // Request to Nexon
        CharacterOcid ocid = nexonApiService.ocid(name).block();
        assert ocid != null;
        ops.put("character:ocid", name, ocid.toString());
        return Mono.just(ocid);
    }

    public Mono<CharacterBasic> basic(String name) {
        // Return redis data if exists
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        String json = ops.get("character:basic", name);
        if (json != null) return Mono.just(CharacterBasic.from(json));

        // Request to maple.gg if time is between 0 and 1 am
        if (NexonApiService.isCollectingTime()) {
            getAndSaveMapleGgBypass(name);
            String mapleGgJson = ops.get("character:basic", name);
            return Mono.just(CharacterBasic.from(mapleGgJson));
        }

        // Request to Nexon
        String ocid = Objects.requireNonNull(ocid(name).block()).ocid();
        CharacterBasic basic = nexonApiService.basic(ocid).block();
        assert basic != null;
        ops.put("character:basic", name, basic.toString());
        return Mono.just(basic);
    }
}
