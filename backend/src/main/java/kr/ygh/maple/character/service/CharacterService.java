package kr.ygh.maple.character.service;

import feign.FeignException;
import kr.ygh.maple.character.dto.basic.Basic;
import kr.ygh.maple.character.dto.itemEquipment.ItemEquipment;
import kr.ygh.maple.character.feign.maple.MapleClient;
import kr.ygh.maple.character.repository.CharacterBasicRepository;
import kr.ygh.maple.common.feign.OpenApiClient;
import kr.ygh.maple.common.feign.OpenApiError;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final OpenApiClient openApiClient;
    private final MapleClient mapleClient;

    private final OcidService ocidService;
    private final CharacterBasicRepository characterBasicRepository;

    @Cacheable(value = "character:basic", key = "#p0")
    public Basic getBasic(String name) {
        String ocid = ocidService.getOcid(name);
        try {
            return openApiClient.getCharacterBasic(ocid);
        } catch (FeignException ex) {
            return getBasicFallback(name, ex);
        }
    }

    private Basic getBasicFallback(String name, FeignException ex) {
        OpenApiError openApiError = OpenApiError.from(ex.contentUTF8());
        if (openApiError != OpenApiError.INVALID_IDENTIFIER) {
            throw ex;
        }

        return characterBasicRepository.findById(name)
                .map(Basic::from)
                .orElseGet(() -> getBasicFromMaple(name));
    }

    private Basic getBasicFromMaple(String name) {
        Basic basic = mapleClient.getBasic(name);
        characterBasicRepository.save(basic.toEntity());
        return basic;
    }

    @Cacheable(value = "character:equipment", key = "#p0")
    public ItemEquipment getItemEquipment(String name) {
        return openApiClient.getCharacterItemEquipment(ocidService.getOcid(name));
    }
}
