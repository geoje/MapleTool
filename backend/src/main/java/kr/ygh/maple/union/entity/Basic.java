package kr.ygh.maple.union.entity;

import kr.ygh.maple.union.dto.basic.BasicResponse;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("union:basic")
public record Basic(@Id String name, BasicResponse data) {
}
