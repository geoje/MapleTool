package kr.ygh.maple.character.controller;

import java.util.List;
import kr.ygh.maple.character.dto.basic.BasicResponse;
import kr.ygh.maple.character.dto.itemEquipment.ItemEquipmentResponse;
import kr.ygh.maple.character.dto.itemEquipment.PotentialResponse;
import kr.ygh.maple.character.service.PotentialService;
import kr.ygh.maple.character.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/character", produces = MediaType.APPLICATION_JSON_VALUE)
public class CharacterController {

    private final RedisService redisService;
    private final PotentialService potentialService;

    @GetMapping("basic")
    public Mono<BasicResponse> basic(@RequestParam("name") String name) {
        return redisService.characterBasic(name);
    }

    @GetMapping("item-equipment")
    public Mono<ItemEquipmentResponse> itemEquipment(@RequestParam("name") String name) {
        return redisService.characterItemEquipment(name);
    }

    @GetMapping("item-equipment/potential")
    public Mono<List<PotentialResponse>> potential(@RequestParam("part") String part,
                                                   @RequestParam("grade") String grade,
                                                   @RequestParam("level") int level) {
        return potentialService.potential(part, grade, level);
    }

    @GetMapping("item-equipment/additional-potential")
    public Mono<List<PotentialResponse>> additionalPotential(@RequestParam("part") String part,
                                                             @RequestParam("grade") String grade,
                                                             @RequestParam("level") int level) {
        return potentialService.additionalPotential(part, grade, level);
    }
}
