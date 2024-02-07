package kr.ygh.maple.service;

import kr.ygh.maple.model.MapleGgBypass;
import kr.ygh.maple.model.character.CharacterBasic;
import kr.ygh.maple.model.character.CharacterOcid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Objects;

@Service
public class RedisService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private NexonApiService nexonApiService;
    @Autowired
    private MapleGgService mapleGgService;

    public void put(String key, String hashKey, String value) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        ops.put(key, hashKey, value);

        Instant tomorrow = LocalDateTime.now()
                .plusDays(1).withHour(1).withMinute(0).withSecond(0)
                .atZone(ZoneId.systemDefault()).toInstant();
        redisTemplate.expireAt(key, Date.from(tomorrow));
    }

    public String get(String key, String hashKey) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        return ops.get(key, hashKey);
    }

    public void getAndSaveMapleGgBypass(String name) {
        MapleGgBypass bypass = mapleGgService.bypass(name).block();
        assert bypass != null;
        put("character:basic", name, bypass.characterBasic().toString());
    }

    public Mono<CharacterOcid> ocid(String name) {
        // Return redis data if exists
        String json = get("character:ocid", name);
        if (json != null) return Mono.just(CharacterOcid.from(json));

        // Request to Nexon
        CharacterOcid ocid = nexonApiService.ocid(name).block();
        assert ocid != null;
        put("character:ocid", name, ocid.toString());
        return Mono.just(ocid);
    }

    public Mono<CharacterBasic> basic(String name) {
        // Return redis data if exists
        String json = get("character:basic", name);
        if (json != null) return Mono.just(CharacterBasic.from(json));

        // Request to maple.gg if time is between 0 and 1 am
        if (NexonApiService.isCollectingTime()) {
            getAndSaveMapleGgBypass(name);
            String mapleGgJson = get("character:basic", name);
            return Mono.just(CharacterBasic.from(mapleGgJson));
        }

        // Request to Nexon
        String ocid = Objects.requireNonNull(ocid(name).block()).ocid();
        CharacterBasic basic = nexonApiService.basic(ocid).block();
        assert basic != null;
        put("character:basic", name, basic.toString());
        return Mono.just(basic);
    }
}
