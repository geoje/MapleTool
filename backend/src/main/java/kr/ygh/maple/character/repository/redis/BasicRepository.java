package kr.ygh.maple.character.repository.redis;

import kr.ygh.maple.character.entity.Basic;
import org.springframework.data.keyvalue.repository.KeyValueRepository;

public interface BasicRepository extends KeyValueRepository<Basic, String> {
}
