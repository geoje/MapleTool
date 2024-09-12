package kr.ygh.maple.character.service;

import kr.ygh.maple.character.entity.Basic;
import kr.ygh.maple.character.entity.Ocid;
import kr.ygh.maple.character.repository.redis.BasicRepository;
import kr.ygh.maple.character.repository.redis.OcidRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterClient characterClient;

    private final OcidRepository ocidRepository;
    private final BasicRepository basicRepository;

    public Ocid readOcid(String name) {
        return ocidRepository.findById(name)
                .orElseGet(() -> ocidRepository.save(
                        new Ocid(name, characterClient.getOcid(name))
                ));
    }

    public Basic readBasic(String name) {
        String ocid = readOcid(name).data().ocid();
        return basicRepository.findById(name)
                .orElseGet(() -> basicRepository.save(
                        new Basic(name, characterClient.getBasic(ocid))
                ));
    }
}
