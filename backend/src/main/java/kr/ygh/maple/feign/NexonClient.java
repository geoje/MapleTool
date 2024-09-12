package kr.ygh.maple.feign;

import kr.ygh.maple.character.dto.ocid.OcidResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("nexon")
public interface NexonClient {

    @GetMapping("/id")
    OcidResponse getOcid(@RequestParam("character_name") String characterName);

    @GetMapping("/character/basic")
    kr.ygh.maple.character.dto.basic.BasicResponse getCharacterBasic(@RequestParam String ocid);

    @GetMapping("/user/union")
    kr.ygh.maple.union.dto.basic.BasicResponse getUnionBasic(@RequestParam String ocid);
}
