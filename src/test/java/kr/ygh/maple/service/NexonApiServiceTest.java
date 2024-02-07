package kr.ygh.maple.service;

import kr.ygh.maple.model.character.CharacterBasic;
import kr.ygh.maple.model.character.CharacterOcid;
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
        CharacterOcid ocid = service.ocid("새벽너울").block();
        CharacterBasic basic = service.basic(ocid.ocid()).block();

        System.out.println("ocid = " + ocid);
        System.out.println("basic = " + basic);
    }
}
