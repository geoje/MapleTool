package kr.ygh.maple.union.service;

import kr.ygh.maple.character.service.CharacterService;
import kr.ygh.maple.common.feign.NexonClient;
import kr.ygh.maple.union.dto.basic.Basic;
import kr.ygh.maple.union.repository.UnionBasicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UnionService {

    private final NexonClient nexonClient;
    private final CharacterService characterService;

    private final UnionBasicRepository basicRepository;

    public Basic readBasic(String name) {
        String ocid = characterService.getOcid(name).ocid();
        return basicRepository.computeIfAbsent(name, () -> nexonClient.getUnionBasic(ocid));
    }
}
