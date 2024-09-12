package kr.ygh.maple.union.service;

import kr.ygh.maple.character.service.CharacterService;
import kr.ygh.maple.feign.NexonClient;
import kr.ygh.maple.union.entity.Basic;
import kr.ygh.maple.union.repository.redis.UnionBasicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UnionService {

    private final NexonClient nexonClient;
    private final CharacterService characterService;

    private final UnionBasicRepository basicRepository;

    public Basic readBasic(String name) {
        String ocid = characterService.readOcid(name).data().ocid();
        return basicRepository.findById(name)
                .orElseGet(() -> basicRepository.save(
                        new Basic(name, nexonClient.getUnionBasic(ocid))
                ));
    }
}
