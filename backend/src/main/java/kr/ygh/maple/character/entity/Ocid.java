package kr.ygh.maple.character.entity;

import org.springframework.data.redis.core.RedisHash;

@RedisHash("character:ocid")
public record Ocid(String ocid) {
}
