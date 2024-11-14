package kr.ygh.maple.character.feign.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.net.URI;
import java.util.List;

@FeignClient(value = "proxy-scrape", configuration = ScrapeConfig.class)
public interface ScrapeClient {

    @GetMapping
    List<URI> get();
}
