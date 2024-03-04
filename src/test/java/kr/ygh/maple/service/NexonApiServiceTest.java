package kr.ygh.maple.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ygh.maple.domain.character.CharacterBasic;
import kr.ygh.maple.domain.character.CharacterItemEquipment;
import kr.ygh.maple.domain.character.CharacterOcid;
import kr.ygh.maple.domain.union.UnionArtifact;
import kr.ygh.maple.domain.union.UnionBasic;
import kr.ygh.maple.domain.union.UnionRaider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("local")
public class NexonApiServiceTest {

    @Autowired
    NexonApiService service;

    @Test
    void ocidAndBasicWork() {
        CharacterOcid ocid = service.characterOcid("새벽너울").block();
        CharacterBasic basic = service.characterBasic(ocid.ocid()).block();

        System.out.println("ocid = " + ocid);
        System.out.println("basic = " + basic);
    }

    @Test
    void itemEquipmentWork() throws JsonProcessingException {
        CharacterOcid ocid = service.characterOcid("수빈양").block();
        CharacterItemEquipment item = service.characterItemEquipment(ocid.ocid()).block();

        String itemJson = new ObjectMapper().writeValueAsString(item);

        System.out.println("item = " + item);
        System.out.println("itemJson = " + itemJson);
    }

    @Test
    void unionBasictWork() throws JsonProcessingException {
        CharacterOcid ocid = service.characterOcid("수빈양").block();
        UnionBasic basic = service.unionBasic(ocid.ocid()).block();

        String basicJson = new ObjectMapper().writeValueAsString(basic);

        System.out.println("basic = " + basic);
        System.out.println("basicJson = " + basicJson);
    }

    @Test
    void unionArtifactWork() throws JsonProcessingException {
        CharacterOcid ocid = service.characterOcid("수빈양").block();
        UnionArtifact artifact = service.unionArtifact(ocid.ocid()).block();

        String artifactJson = new ObjectMapper().writeValueAsString(artifact);

        System.out.println("artifact = " + artifact);
        System.out.println("artifactJson = " + artifactJson);
    }

    @Test
    void unioRaiderWork() throws JsonProcessingException {
        CharacterOcid ocid = service.characterOcid("수빈양").block();
        UnionRaider raider = service.unionRaider(ocid.ocid()).block();

        String raiderJson = new ObjectMapper().writeValueAsString(raider);

        System.out.println("raider = " + raider);
        System.out.println("raiderJson = " + raiderJson);
    }
}
