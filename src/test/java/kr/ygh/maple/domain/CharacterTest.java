package kr.ygh.maple.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ygh.maple.domain.character.CharacterOcid;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CharacterTest {

    @Test
    void convertToJson() throws JsonProcessingException {
        CharacterOcid characterOcid = new CharacterOcid("abcd");

        String result = new ObjectMapper().writeValueAsString(characterOcid);

        System.out.println("result = " + result);
    }

    @Test
    void createByJson() throws JsonProcessingException {
        String json = "{\"ocid\":\"abcd\"}";
        CharacterOcid characterOcid = new ObjectMapper().readValue(json, CharacterOcid.class);

        System.out.println("characterOcid = " + characterOcid);
    }
}
