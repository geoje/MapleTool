package kr.ygh.maple.character.repository;

import kr.ygh.maple.character.entity.CharacterBasic;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterBasicRepository extends CrudRepository<CharacterBasic, String> {
}
