package kr.ygh.maple.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ygh.maple.domain.character.CharacterBasic;
import kr.ygh.maple.domain.character.CharacterItemEquipment;
import kr.ygh.maple.domain.union.UnionArtifact;
import kr.ygh.maple.domain.union.UnionBasic;
import kr.ygh.maple.domain.union.UnionRaider;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record MapleGgBypass(CharacterBasic characterBasic, CharacterItemEquipment characterItemEquipment,
                            UnionBasic unionBasic, UnionRaider unionRaider, UnionArtifact unionArtifact) {

    public static MapleGgBypass from(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);
            JsonNode data = root.get("data");
            return new MapleGgBypass(
                    mapper.treeToValue(data.get("characterBasic"), CharacterBasic.class),
                    mapper.treeToValue(data.get("characterItemEquipment"), CharacterItemEquipment.class),
                    mapper.treeToValue(data.get("userUnion"), UnionBasic.class),
                    mapper.treeToValue(data.get("userUnionRaider"), UnionRaider.class),
                    mapper.treeToValue(data.get("userUnionArtifact"), UnionArtifact.class)
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}