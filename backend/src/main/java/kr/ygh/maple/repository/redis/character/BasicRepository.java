package kr.ygh.maple.repository.redis.character;

import kr.ygh.maple.dto.character.CharacterBasic;
import org.springframework.data.repository.CrudRepository;

public interface BasicRepository extends CrudRepository<CharacterBasic, Integer> {
}
