package kr.ygh.maple.repository;

import kr.ygh.maple.entity.Potential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PotentialRepository extends JpaRepository<Potential, Long> {

    @Query("SELECT p.part, p.grade, p.level, p.position, sum(p.probability) " +
            "FROM Potential p " +
            "GROUP BY p.part, p.grade, p.level, p.position")
    List<Object[]> findProbabilitySum();
}
