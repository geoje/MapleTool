package kr.ygh.maple.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ygh.maple.dto.MapleGgBypass;
import kr.ygh.maple.dto.character.CharacterBasic;
import kr.ygh.maple.dto.character.CharacterItemEquipment;
import kr.ygh.maple.dto.character.CharacterOcid;
import kr.ygh.maple.dto.union.UnionArtifact;
import kr.ygh.maple.dto.union.UnionBasic;
import kr.ygh.maple.dto.union.UnionRaider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Objects;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, String> redisTemplate;
    private final NexonApiService nexonApiService;
    private final MapleGgService mapleGgService;

    private <T> Mono<T> cacheOrRequest(String name, String key, Class<T> classType, Function<String, Mono<T>> requestNexonFunc) {
        // Return redis data if exists
        T obj = get(key, name, classType);
        if (obj != null) return Mono.just(obj);

        // Request to maple.gg if time is between 0 and 1 am
        if (NexonApiService.isCollectingTime()) {
            getAndSaveMapleGgBypass(name);
            obj = get(key, name, classType);
            return Mono.just(obj);
        }

        // Request to Nexon
        String ocid = Objects.requireNonNull(characterOcid(name).block()).ocid();
        obj = requestNexonFunc.apply(ocid).block();
        assert obj != null;
        put(key, name, obj);
        return Mono.just(obj);
    }

    private void getAndSaveMapleGgBypass(String name) {
        MapleGgBypass bypass = mapleGgService.bypass(name).block();
        assert bypass != null;
        put("character:basic", name, bypass.characterBasic());
        put("character:item-equipment", name, bypass.characterItemEquipment());
        put("union:basic", name, bypass.unionBasic());
        put("union:raider", name, bypass.unionRaider());
        put("union:artifact", name, bypass.unionArtifact());
    }

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

    public Mono<CharacterOcid> characterOcid(String name) {
        // Return redis data if exists
        CharacterOcid obj = get("character:ocid", name, CharacterOcid.class);
        if (obj != null) return Mono.just(obj);

        // Request to Nexon
        obj = nexonApiService.characterOcid(name).block();
        put("character:ocid", name, obj);
        return Mono.just(obj);
    }

    public Mono<CharacterBasic> characterBasic(String name) {
        return cacheOrRequest(name, "character:basic", CharacterBasic.class, nexonApiService::characterBasic);
    }

    public Mono<CharacterItemEquipment> characterItemEquipment(String name) {
        return cacheOrRequest(name, "character:item-equipment", CharacterItemEquipment.class, nexonApiService::characterItemEquipment);
    }

    public Mono<UnionBasic> unionBasic(String name) {
        return cacheOrRequest(name, "union:basic", UnionBasic.class, nexonApiService::unionBasic);
    }

    public Mono<UnionRaider> unionRaider(String name) {
        return cacheOrRequest(name, "union:raider", UnionRaider.class, nexonApiService::unionRaider);
    }

    public Mono<UnionArtifact> unionArtifact(String name) {
        return cacheOrRequest(name, "union:artifact", UnionArtifact.class, nexonApiService::unionArtifact);
    }
}
