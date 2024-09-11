package kr.ygh.maple.character.service;

import kr.ygh.maple.character.entity.Basic;
import kr.ygh.maple.character.entity.Ocid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {

    CharacterClient characterClient;

    public Basic readBasic(String name) {
        Ocid ocid = characterClient.getOcid(name);
        return characterClient.getBasic(ocid.ocid());
    }
}
