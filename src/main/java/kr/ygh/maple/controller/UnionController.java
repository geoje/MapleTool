package kr.ygh.maple.controller;

import kr.ygh.maple.dto.union.UnionArtifact;
import kr.ygh.maple.dto.union.UnionBasic;
import kr.ygh.maple.dto.union.UnionRaider;
import kr.ygh.maple.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/union", produces = MediaType.APPLICATION_JSON_VALUE)
public class UnionController {

    private final RedisService redisService;

    private static void validateBlankOrEmpty(String data) {
        if (data.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Query name is blank or empty");
        }
    }

    @GetMapping("basic")
    public Mono<UnionBasic> basic(@RequestParam("name") String name) {
        validateBlankOrEmpty(name);
        return redisService.unionBasic(name);
    }

    @GetMapping("raider")
    public Mono<UnionRaider> raider(@RequestParam("name") String name) {
        validateBlankOrEmpty(name);
        return redisService.unionRaider(name);
    }

    @GetMapping("artifact")
    public Mono<UnionArtifact> artifact(@RequestParam("name") String name) {
        validateBlankOrEmpty(name);
        return redisService.unionArtifact(name);
    }
}
