package kr.ygh.maple.character.service;

import feign.Param;
import kr.ygh.maple.character.dto.basic.Basic;
import kr.ygh.maple.character.dto.itemEquipment.ItemEquipment;
import kr.ygh.maple.common.feign.NexonClient;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final NexonClient nexonClient;
    private final OcidService ocidService;

    @Cacheable(value = "character:basic", key = "#name")
    public Basic getBasic(@Param("name") String name) {
        return nexonClient.getCharacterBasic(ocidService.getOcid(name));
    }

    @Cacheable(value = "character:equipment", key = "#name")
    public ItemEquipment getItemEquipment(@Param("name") String name) {
        return nexonClient.getCharacterItemEquipment(ocidService.getOcid(name));
    }
}
