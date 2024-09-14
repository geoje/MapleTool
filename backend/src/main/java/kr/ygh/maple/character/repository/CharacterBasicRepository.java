package kr.ygh.maple.character.repository;


import kr.ygh.maple.character.dto.basic.Basic;
import kr.ygh.maple.common.repository.RedisRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CharacterBasicRepository extends RedisRepository<Basic> {

    protected CharacterBasicRepository(RedisTemplate<String, String> redisTemplate) {
        super(redisTemplate, "character:basic");
    }
}
