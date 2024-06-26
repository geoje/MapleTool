package kr.ygh.maple.repository;

import jakarta.transaction.Transactional;
import kr.ygh.maple.entity.AdditionalPotential;
import kr.ygh.maple.repository.db.AdditionalPotentialRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("에디셔널 잠재능력 저장소")
@DataJpaTest
@Transactional
class AdditionalPotentialRepositoryTest {

    @Autowired
    AdditionalPotentialRepository additionalPotentialRepository;

    @Test
    @DisplayName("모든 경우의 수에 각 라인 확률 합이 1과 오차 0.000015사이 이다.")
    void validateProbabilitiesSum() {
        // given
        final List<AdditionalPotential> potentials = additionalPotentialRepository.findAll();
        final double offset = 0.000015;
        int position = -1;
        double sumOfProbability = 1;

        // when & then
        for (AdditionalPotential potential : potentials) {
            if (potential.getPosition() != position) {
                position = potential.getPosition();
                assertThat(sumOfProbability).isBetween(1 - offset, 1 + offset);
                sumOfProbability = 0;
            }
            sumOfProbability += potential.getProbability();
        }
        assertThat(sumOfProbability).isBetween(1 - offset, 1 + offset);
    }

    @Test
    @Disabled
    @DisplayName("입력한 레벨 보다 낮은 것 중 가장 근처 레벨을 조회 한다.")
    void findMaxLevelLessOrEqualThan() {
        // given
        String part = "무기";
        int level = 200;

        // when
        final int maxLevel = additionalPotentialRepository.findMaxLevelLessOrEqualThan(part, level);

        // then
        assertThat(maxLevel).isEqualTo(120);
    }
}
