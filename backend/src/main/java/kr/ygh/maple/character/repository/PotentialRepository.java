package kr.ygh.maple.character.repository;

import java.util.List;
import java.util.Optional;
import kr.ygh.maple.character.entity.Potential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PotentialRepository extends JpaRepository<Potential, Long> {

    @Query("SELECT MAX(level) FROM Potential WHERE part = :part AND level <= :level")
    Optional<Integer> findMaxLevel(@Param("part") String part, @Param("level") int level);

    List<Potential> findByTypeAndGradeAndPartAndLevel(String type, String grade, String part, int level);
}
