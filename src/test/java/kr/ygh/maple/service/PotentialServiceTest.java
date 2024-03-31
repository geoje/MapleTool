package kr.ygh.maple.service;

import kr.ygh.maple.dto.character.itemEquipment.PotentialDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@DisplayName("잠재능력 서비스")
class PotentialServiceTest {

    @Autowired
    private PotentialService potentialService;

    @Test
    @DisplayName("장비 타입, 등급, 레벨을 통해 잠재 능력 리스트를 DB에서 가져온다.")
    void potentialTest() {
        // given
        final Optional<List<PotentialDto>> optional = potentialService.potential("무기", "레전드리", 77).blockOptional();

        // when & then
        assertThat(optional.isPresent()).isTrue();
        optional.get().forEach(System.out::println);
        optional.ifPresent((potentialDtos) -> assertThat(potentialDtos.size()).isGreaterThan(0));
    }
}