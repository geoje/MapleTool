package kr.ygh.maple.character.repository.redis;

import kr.ygh.maple.character.entity.Ocid;
import org.springframework.data.keyvalue.repository.KeyValueRepository;

public interface OcidRepository extends KeyValueRepository<Ocid, String> {
}
