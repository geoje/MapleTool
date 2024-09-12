package kr.ygh.maple.union.repository.redis;

import kr.ygh.maple.union.entity.Basic;
import org.springframework.data.keyvalue.repository.KeyValueRepository;

public interface UnionBasicRepository extends KeyValueRepository<Basic, String> {
}
