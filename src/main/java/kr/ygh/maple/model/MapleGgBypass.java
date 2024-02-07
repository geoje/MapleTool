package kr.ygh.maple.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ygh.maple.model.character.CharacterBasic;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record MapleGgBypass(CharacterBasic characterBasic) {

    public static MapleGgBypass from(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);
            JsonNode data = root.get("data");
            return new MapleGgBypass(
                    mapper.treeToValue(data.get("characterBasic"), CharacterBasic.class)
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
