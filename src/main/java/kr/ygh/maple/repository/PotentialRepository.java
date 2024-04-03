package kr.ygh.maple.repository;

import kr.ygh.maple.entity.Potential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PotentialRepository extends JpaRepository<Potential, Long> {

    /**
     * select sum 빼고
     * 정보를 다 가지고 오고
     * 코드 상에서 Sum
     * <p>
     * 아래 JPQL로는 인덱싱을 제대로 활용하지 못한다.
     * 인덱싱 활용하여 모드 select 하여 들고온 뒤 sum을 한다.
     */


    @Query("SELECT p.part, p.grade, p.level, p.position, sum(p.probability) " +
            "FROM Potential p " +
            "GROUP BY p.part, p.grade, p.level, p.position")
    List<Object[]> findProbabilitySum();

    // QueryDSL 로 가도 되나?
    // 아직 쿼리 2개 밖에 없다
    // 흥미를 느꼈을 때 새로운 기술을 공부해서 써 봐라.
    // 어짜피 레벨 2,3 에 뚜둘겨 맞는다.
    // 미리 해보면 알고 좋다?

    /**
     * 동적 쿼리 만들기 어려울 떄 (바인딩,,...)
     * 엄청 복잡한 쿼리 / Group By와 Select
     * 인원수 2, 3명 (협업에)
     */


    @Query("SELECT DISTINCT level " +
            "FROM Potential " +
            "WHERE part = :part AND level <= :level " +
            "ORDER BY level DESC " +
            "LIMIT 1")
    int findMaxLevelLessOrEqualThan(@Param("part") String part,
                                    @Param("level") int level);

    List<Potential> findAllByPartAndGradeAndLevel(String part, String grade, int level);
}
