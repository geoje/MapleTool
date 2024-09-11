package kr.ygh.maple.character.repository;

import kr.ygh.maple.character.entity.Ocid;
import org.springframework.data.repository.CrudRepository;

public interface OcidRepository extends CrudRepository<Ocid, String> {
}
