package kr.ygh.maple.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ygh.maple.dto.character.CharacterBasic;
import kr.ygh.maple.dto.character.CharacterItemEquipment;
import kr.ygh.maple.dto.union.UnionArtifact;
import kr.ygh.maple.dto.union.UnionBasic;
import kr.ygh.maple.dto.union.UnionRaider;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record MapleGgBypass(CharacterBasic characterBasic, CharacterItemEquipment characterItemEquipment,
                            UnionBasic unionBasic, UnionRaider unionRaider, UnionArtifact unionArtifact) {

    public static MapleGgBypass from(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);
            JsonNode data = root.get("data");
            if (data == null) throw new NullPointerException("캐릭터를 찾지 못하였습니다.");
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
