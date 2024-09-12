package kr.ygh.maple.character.entity;

import kr.ygh.maple.character.dto.basic.BasicResponse;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("character:basic")
public record Basic(@Id String name, BasicResponse data) {
}
