package kr.ygh.maple.character.service;

import kr.ygh.maple.character.entity.Basic;
import kr.ygh.maple.character.entity.Ocid;
import kr.ygh.maple.character.repository.redis.CharacterBasicRepository;
import kr.ygh.maple.character.repository.redis.CharacterOcidRepository;
import kr.ygh.maple.feign.NexonClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final NexonClient nexonClient;

    private final CharacterOcidRepository ocidRepository;
    private final CharacterBasicRepository basicRepository;

    public Ocid readOcid(String name) {
        return ocidRepository.findById(name)
                .orElseGet(() -> ocidRepository.save(
                        new Ocid(name, nexonClient.getOcid(name))
                ));
    }

    public Basic readBasic(String name) {
        String ocid = readOcid(name).data().ocid();
        return basicRepository.findById(name)
                .orElseGet(() -> basicRepository.save(
                        new Basic(name, nexonClient.getCharacterBasic(ocid))
                ));
    }
}
