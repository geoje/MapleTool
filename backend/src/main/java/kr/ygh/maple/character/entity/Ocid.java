package kr.ygh.maple.character.entity;

import kr.ygh.maple.character.dto.ocid.OcidResponse;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("character:ocid")
public record Ocid(@Id String name, OcidResponse data) {
}
