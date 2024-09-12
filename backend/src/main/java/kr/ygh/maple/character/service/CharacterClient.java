package kr.ygh.maple.character.service;

import kr.ygh.maple.character.dto.basic.BasicResponse;
import kr.ygh.maple.character.dto.ocid.OcidResponse;
import kr.ygh.maple.config.NexonFeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "character", url = "${nexon.url}", configuration = NexonFeignConfig.class)
public interface CharacterClient {

    @GetMapping("/maplestory/v1/id")
    OcidResponse getOcid(@RequestParam("character_name") String characterName);

    @GetMapping("/maplestory/v1/character/basic")
    BasicResponse getBasic(@RequestParam String ocid);
}
