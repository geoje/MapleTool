package kr.ygh.maple.controller;

import kr.ygh.maple.dto.character.CharacterBasic;
import kr.ygh.maple.dto.character.CharacterItemEquipment;
import kr.ygh.maple.dto.character.itemEquipment.PotentialDto;
import kr.ygh.maple.service.PotentialService;
import kr.ygh.maple.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/character", produces = MediaType.APPLICATION_JSON_VALUE)
public class CharacterController {

    private final RedisService redisService;
    private final PotentialService potentialService;

    @GetMapping("basic")
    public Mono<CharacterBasic> basic(@RequestParam("name") String name) {
        return redisService.characterBasic(name);
    }

    @GetMapping("item-equipment")
    public Mono<CharacterItemEquipment> itemEquipment(@RequestParam("name") String name) {
        return redisService.characterItemEquipment(name);
    }

    @GetMapping("item-equipment/potential")
    public Mono<List<PotentialDto>> potential(@RequestParam("part") String part,
                                              @RequestParam("grade") String grade,
                                              @RequestParam("level") int level) {
        return potentialService.potential(part, grade, level);
    }

    @GetMapping("item-equipment/additional-potential")
    public Mono<List<PotentialDto>> additionalPotential(@RequestParam("part") String part,
                                                        @RequestParam("grade") String grade,
                                                        @RequestParam("level") int level) {
        return potentialService.additionalPotential(part, grade, level);
    }
}
