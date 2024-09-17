package kr.ygh.maple.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import kr.ygh.maple.character.entity.Potential;
import kr.ygh.maple.character.repository.PotentialRepository;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

@DataJpaTest
@Sql(value = "/data/potential.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class PotentialRepositoryTest {

    @Autowired
    PotentialRepository potentialRepository;

    @Test
    @DisplayName("모든 경우의 수에 각 위치 확률 합의 오차가 범위 이하이다.")
    void validateProbabilitiesSum() {
        // given
        double offset = 0.000012;

        // when
        List<Potential> potentials = potentialRepository.findAll();
        Map<PotentialKey, Double> potentialsByKey = potentials.stream().collect(Collectors.groupingBy(
                PotentialKey::new,
                Collectors.summingDouble(Potential::getProbability)
        ));

        // then
        assertThat(potentialsByKey).hasValueSatisfying(
                new Condition<>(v -> Math.abs(1 - v) <= offset, "isNotOverOffset")
        );
    }

    @Test
    @DisplayName("입력한 레벨 보다 낮은 것 중 가장 근처 레벨을 조회 한다.")
    void findMaxLevelLessOrEqualThan() {
        // given
        String part = "무기";
        int level = 200;

        // when
        final int maxLevel = potentialRepository.findMaxLevel(part, level).orElse(0);

        // then
        assertThat(maxLevel).isEqualTo(120);
    }

    private record PotentialKey(String type, String grade, String part, int level, int position) {

        public PotentialKey(Potential potential) {
            this(
                    potential.getType(),
                    potential.getGrade(),
                    potential.getPart(),
                    potential.getLevel(),
                    potential.getPosition()
            );
        }
    }
}
