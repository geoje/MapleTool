package kr.ygh.maple.character.service;

import kr.ygh.maple.character.dto.basic.Basic;
import kr.ygh.maple.character.dto.itemEquipment.ItemEquipment;
import kr.ygh.maple.common.feign.OpenApiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final OpenApiClient openApiClient;
    private final OcidService ocidService;

    @Cacheable(value = "character:basic", key = "#p0")
    public Basic getBasic(String name) {
        return openApiClient.getCharacterBasic(ocidService.getOcid(name));
    }

    @Cacheable(value = "character:equipment", key = "#p0")
    public ItemEquipment getItemEquipment(String name) {
        return openApiClient.getCharacterItemEquipment(ocidService.getOcid(name));
    }
}
