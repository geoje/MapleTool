package kr.ygh.maple.character.service;

import kr.ygh.maple.character.dto.basic.Basic;
import kr.ygh.maple.character.dto.ocid.Ocid;
import kr.ygh.maple.character.repository.CharacterBasicRepository;
import kr.ygh.maple.character.repository.CharacterOcidRepository;
import kr.ygh.maple.common.feign.NexonClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final NexonClient nexonClient;

    private final CharacterOcidRepository ocidRepository;
    private final CharacterBasicRepository basicRepository;

    public Ocid getOcid(String name) {
        return ocidRepository.computeIfAbsent(name, () -> nexonClient.getOcid(name));
    }

    public Basic getBasic(String name) {
        String ocid = getOcid(name).ocid();
        return basicRepository.computeIfAbsent(name, () -> nexonClient.getCharacterBasic(ocid));
    }
}
