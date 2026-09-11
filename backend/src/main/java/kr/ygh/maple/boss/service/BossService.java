package kr.ygh.maple.boss.service;

import kr.ygh.maple.boss.dto.CharacterSchedule;
import kr.ygh.maple.character.service.OcidService;
import kr.ygh.maple.common.feign.OpenApiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BossService {

    private final OpenApiClient openApiClient;
    private final OcidService ocidService;

    @Cacheable(value = "boss:schedule", key = "#p0")
    public CharacterSchedule readSchedule(String name) {
        return openApiClient.getSchedulerCharacterState(ocidService.getOcid(name));
    }
}
