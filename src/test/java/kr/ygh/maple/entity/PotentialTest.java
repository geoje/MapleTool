package kr.ygh.maple.entity;

import jakarta.transaction.Transactional;
import kr.ygh.maple.repository.PotentialRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@DisplayName("잠재능력")
class PotentialTest {

    @Autowired
    PotentialRepository potentialRepository;

    @Test
    @DisplayName("모든 경우의 수에 각 라인 확률 합이 1과 오차 0.000015사이 이다.")
    void validateProbabilitiesSum() {
        // given
        final double offset = 0.000015;
        final List<Object[]> results = potentialRepository.findProbabilitySum();

        // when
        final List<Object[]> overOffsetResults = results.stream()
                .filter(result -> Math.abs(((double) result[4]) - 1) > offset)
                .toList();

        // then
        assertThat(overOffsetResults.size()).isZero();

        // output
        overOffsetResults.stream()
                .map(result -> Arrays.stream(result)
                        .map(Object::toString)
                        .collect(Collectors.joining()))
                .forEach(System.out::println);
    }

    @Test
    @DisplayName("입력한 레벨 보다 낮은 것 중 가장 근처 레벨을 조회한다.")
    void findMaxLevelLessOrEqualThan() {
        // given
        String part = "무기";
        int level = 200;

        // when
        final int maxLevel = potentialRepository.findMaxLevelLessOrEqualThan(part, level);

        // then
        assertThat(maxLevel).isEqualTo(120);
    }
}
