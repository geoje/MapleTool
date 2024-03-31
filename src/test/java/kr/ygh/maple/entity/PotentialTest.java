package kr.ygh.maple.entity;

import jakarta.transaction.Transactional;
import kr.ygh.maple.repository.PotentialRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@DisplayName("잠재능력")
class PotentialTest {

    @Autowired
    PotentialRepository potentialRepository;

    @Test
    @DisplayName("각 라인의 확률 합이 1 과 오차 0.000015 사이 이다.")
    void validateProbabilitiesSum() {
        // given
        final double offset = 0.000015;
        final List<Object[]> results = potentialRepository.findProbabilitySum();

        // when
        final boolean actual = results.stream()
                .map(result -> (double) result[4])
                .allMatch(p -> Math.abs(p - 1) < offset);

        // then
        assertThat(actual).isTrue();
    }
}
