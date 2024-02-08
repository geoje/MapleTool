package kr.ygh.maple.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    public void put(String key, String hashKey, Object value) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        try {
            ops.put(key, hashKey, new ObjectMapper().writeValueAsString(value));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Instant tomorrow = LocalDateTime.now()
                .plusDays(1).withHour(1).withMinute(0).withSecond(0)
                .atZone(ZoneId.systemDefault()).toInstant();
        redisTemplate.expireAt(key, Date.from(tomorrow));
    }

    public <T> T get(String key, String hashKey, Class<T> classType) {
        String json = (String) redisTemplate.opsForHash().get(key, hashKey);
        if (json == null) return null;

        try {
            return new ObjectMapper().readValue(json, classType);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public void getAndSaveMapleGgBypass(String name) {
        MapleGgBypass bypass = mapleGgService.bypass(name).block();
        assert bypass != null;
        put("character:basic", name, bypass.characterBasic());
    }

    public Mono<CharacterOcid> ocid(String name) {
        // Return redis data if exists
        CharacterOcid obj = get("character:ocid", name, CharacterOcid.class);
        if (obj != null) return Mono.just(obj);

        // Request to Nexon
        obj = nexonApiService.ocid(name).block();
        put("character:ocid", name, obj);
        return Mono.just(obj);
    }

    public Mono<CharacterBasic> basic(String name) {
        // Return redis data if exists
        CharacterBasic obj = get("character:basic", name, CharacterBasic.class);
        if (obj != null) return Mono.just(obj);

        // Request to maple.gg if time is between 0 and 1 am
        if (NexonApiService.isCollectingTime()) {
            getAndSaveMapleGgBypass(name);
            obj = get("character:basic", name, CharacterBasic.class);
            return Mono.just(obj);
        }

        // Request to Nexon
        String ocid = Objects.requireNonNull(ocid(name).block()).ocid();
        obj = nexonApiService.basic(ocid).block();
        assert obj != null;
        put("character:basic", name, obj);
        return Mono.just(obj);
    }
}
