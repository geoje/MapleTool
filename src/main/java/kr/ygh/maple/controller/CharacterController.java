package kr.ygh.maple.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/character")
public class CharacterController {

    @Value("${nexon.api.url}")
    private String NEXON_API_URL;
    @Value("${nexon.api.key}")
    private String NEXON_API_KEY;

    @GetMapping("test")
    public Map<String, Object> test() {
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("hello", "world");
        return map;
    }

    @GetMapping("item-equipment")
    public Mono<String> itemEquipment(Map<String, Object> req) {
        System.out.println("req.get(\"character_name\") = " + req.get("character_name"));
        return WebClient.builder()
                .baseUrl(NEXON_API_URL + "/maplestory/v1/id?character_name=" + req.get("character_name"))
                .defaultHeader("x-nxopen-api-key", NEXON_API_KEY)
                .build()
                .get()
                .retrieve()
                .bodyToMono(String.class);
    }
}
