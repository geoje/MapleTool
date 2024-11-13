package kr.ygh.maple.character.feign;

import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import kr.ygh.maple.character.dto.basic.Basic;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "maple", configuration = HtmlConfig.class)
public interface MapleClient {

    @RateLimiter(name = "maple")
    @GetMapping("/N23Ranking/World/Total")
    Basic getBasic(@RequestParam("c") String characterName);
}
