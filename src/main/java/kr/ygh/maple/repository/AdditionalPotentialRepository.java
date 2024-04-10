package kr.ygh.maple.repository;

import kr.ygh.maple.entity.AdditionalPotential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdditionalPotentialRepository extends JpaRepository<AdditionalPotential, Long> {

    @Query("SELECT DISTINCT level " +
            "FROM Potential " +
            "WHERE part = :part AND level <= :level " +
            "ORDER BY level DESC " +
            "LIMIT 1")
    int findMaxLevelLessOrEqualThan(@Param("part") String part,
                                    @Param("level") int level);

    List<AdditionalPotential> findAllByPartAndGradeAndLevel(String part, String grade, int level);
}
