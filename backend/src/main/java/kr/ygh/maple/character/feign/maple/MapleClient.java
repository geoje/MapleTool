package kr.ygh.maple.character.feign.maple;

import kr.ygh.maple.character.dto.basic.Basic;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "maple", configuration = MapleConfig.class)
public interface MapleClient {

    @GetMapping("/N23Ranking/World/Total")
    Basic getBasic(@RequestParam("c") String characterName);
}
