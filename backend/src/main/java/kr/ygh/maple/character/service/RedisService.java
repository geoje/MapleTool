package kr.ygh.maple.character.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.function.Function;
import kr.ygh.maple.character.dto.basic.BasicResponse;
import kr.ygh.maple.character.dto.itemEquipment.ItemEquipmentResponse;
import kr.ygh.maple.character.dto.ocid.OcidResponse;
import kr.ygh.maple.union.dto.artifact.UnionArtifact;
import kr.ygh.maple.union.dto.basic.UnionBasic;
import kr.ygh.maple.union.dto.raider.UnionRaider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class RedisService {

    public static final int QUARTER_OF_HOUR = 15;

    private final RedisTemplate<String, String> redisTemplate;
    private final NexonApiService nexonApiService;

    private static Instant getNextQuarterOfHour() {
        int expireMinutes = QUARTER_OF_HOUR * (LocalTime.now().getMinute() / QUARTER_OF_HOUR + 1);
        return LocalDateTime.now()
                .withMinute(0)
                .withSecond(0)
                .plusMinutes(expireMinutes)
                .atZone(ZoneId.of("Asia/Seoul"))
                .toInstant();
    }

    private <T> Mono<T> cacheOrRequest(String name, String key, Class<T> classType,
                                       Function<String, Mono<T>> requestNexonFunc) {
        // Return redis data if exists
        T objRedis = get(key, name, classType);
        if (objRedis != null) {
            return Mono.just(objRedis);
        }

        // Request to Nexon
        return characterOcid(name)
                .flatMap(ocid -> requestNexonFunc.apply(ocid.ocid()))
                .map(objNexon -> {
                    put(key, name, objNexon);
                    return objNexon;
                });
    }

    public void put(String key, String hashKey, Object value) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        try {
            ops.put(key, hashKey, new ObjectMapper().writeValueAsString(value));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        redisTemplate.expireAt(key, Date.from(getNextQuarterOfHour()));
    }

    public <T> T get(String key, String hashKey, Class<T> classType) {
        String json = (String) redisTemplate.opsForHash().get(key, hashKey);
        if (json == null) {
            return null;
        }

        try {
            return new ObjectMapper().readValue(json, classType);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private Mono<OcidResponse> characterOcid(String name) {
        // Return redis data if exists
        OcidResponse obj = get("character:ocid", name, OcidResponse.class);
        if (obj != null) {
            return Mono.just(obj);
        }

        // Request to Nexon
        return nexonApiService.characterOcid(name)
                .map(ocid -> {
                    put("character:ocid", name, ocid);
                    return ocid;
                });
    }

    public Mono<BasicResponse> characterBasic(String name) {
        return cacheOrRequest(name, "character:basic", BasicResponse.class, nexonApiService::characterBasic);
    }

    public Mono<ItemEquipmentResponse> characterItemEquipment(String name) {
        return cacheOrRequest(name, "character:item-equipment", ItemEquipmentResponse.class,
                nexonApiService::characterItemEquipment);
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
