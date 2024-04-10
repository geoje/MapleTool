package kr.ygh.maple.repository;

import kr.ygh.maple.entity.Potential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PotentialRepository extends JpaRepository<Potential, Long> {

    @Query("SELECT DISTINCT level " +
            "FROM Potential " +
            "WHERE part = :part AND level <= :level " +
            "ORDER BY level DESC " +
            "LIMIT 1")
    Integer findMaxLevelLessOrEqualThan(@Param("part") String part,
                                        @Param("level") int level);

    List<Potential> findAllByPartAndGradeAndLevel(String part, String grade, int level);
}
