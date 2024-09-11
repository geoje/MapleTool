package kr.ygh.maple.character.service;

import feign.Headers;
import kr.ygh.maple.character.entity.Basic;
import kr.ygh.maple.character.entity.Ocid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Headers("x-nxopen-api-key: ${nexon.key}")
@FeignClient("character")
public interface CharacterClient {

    @GetMapping("/maplestory/v1/id")
    Ocid getOcid(@RequestParam String characterName);

    @GetMapping("/maplestory/v1/character/basic")
    Basic getBasic(@RequestParam String ocid);
}
