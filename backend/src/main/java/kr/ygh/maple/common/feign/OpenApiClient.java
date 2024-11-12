package kr.ygh.maple.common.feign;

import kr.ygh.maple.character.dto.basic.Basic;
import kr.ygh.maple.character.dto.itemEquipment.ItemEquipment;
import kr.ygh.maple.character.dto.ocid.Ocid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("open-api")
public interface OpenApiClient {

    @GetMapping("/id")
    Ocid getOcid(@RequestParam("character_name") String characterName);

    @GetMapping("/character/basic")
    Basic getCharacterBasic(@RequestParam("ocid") String ocid);

    @GetMapping("/character/item-equipment")
    ItemEquipment getCharacterItemEquipment(@RequestParam("ocid") String ocid);

    @GetMapping("/user/union")
    kr.ygh.maple.union.dto.basic.Basic getUnionBasic(@RequestParam("ocid") String ocid);
}
