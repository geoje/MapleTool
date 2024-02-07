package kr.ygh.maple.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ygh.maple.model.character.CharacterBasic;
import kr.ygh.maple.model.character.CharacterItemEquipment;
import kr.ygh.maple.model.union.UnionArtifact;
import kr.ygh.maple.model.union.UnionBasic;
import kr.ygh.maple.model.union.UnionRaider;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record MapleGgBypass(CharacterBasic characterBasic, CharacterItemEquipment characterItemEquipment,
                            UnionBasic userUnion, UnionArtifact userUnionArtifact, UnionRaider userUnionRaider) {

    public static MapleGgBypass from(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);
            JsonNode data = root.get("data");
            return new MapleGgBypass(
                    mapper.treeToValue(data.get("characterBasic"), CharacterBasic.class),
                    mapper.treeToValue(data.get("characterItemEquipment"), CharacterItemEquipment.class),
                    mapper.treeToValue(data.get("userUnion"), UnionBasic.class),
                    mapper.treeToValue(data.get("userUnionArtifact"), UnionArtifact.class),
                    mapper.treeToValue(data.get("userUnionRaider"), UnionRaider.class)
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
