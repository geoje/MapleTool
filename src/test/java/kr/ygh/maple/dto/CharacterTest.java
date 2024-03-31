package kr.ygh.maple.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ygh.maple.dto.character.CharacterOcid;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@DisplayName("캐릭터")
public class CharacterTest {

    @Test
    @DisplayName("Object를 JSON으로 변환한다.")
    void convertToJson() throws JsonProcessingException {
        CharacterOcid characterOcid = new CharacterOcid("abcd");

        String result = new ObjectMapper().writeValueAsString(characterOcid);

        System.out.println("result = " + result);
    }

    @Test
    @DisplayName("JSON을 통해 Object로 생성한다.")
    void createByJson() throws JsonProcessingException {
        String json = "{\"ocid\":\"abcd\"}";
        CharacterOcid characterOcid = new ObjectMapper().readValue(json, CharacterOcid.class);

        System.out.println("characterOcid = " + characterOcid);
    }
}
