package kr.ygh.maple.union.repository;


import kr.ygh.maple.common.repository.RedisRepository;
import kr.ygh.maple.union.dto.basic.Basic;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UnionBasicRepository extends RedisRepository<Basic> {

    protected UnionBasicRepository(RedisTemplate<String, Object> redisTemplate) {
        super(redisTemplate, "union:basic");
    }
}
