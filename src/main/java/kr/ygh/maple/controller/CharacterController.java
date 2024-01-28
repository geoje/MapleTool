package kr.ygh.maple.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@RequestMapping("/character")
public class CharacterController {

    @Value("${nexon.api.url}")
    private String NEXON_API_URL;
    @Value("${nexon.api.key}")
    private String NEXON_API_KEY;

    @GetMapping("item-equipment")
    public Mono<String> itemEquipment(Map<String, Object> req) {
        System.out.println(req.get("character_name").toString());
        return WebClient.builder()
                .baseUrl(NEXON_API_URL + "/maplestory/v1/id?character_name=" + req.get("character_name"))
                .defaultHeader("x-nxopen-api-key", NEXON_API_URL)
                .build()
                .get()
                .retrieve()
                .bodyToMono(String.class);
    }
}
