package kr.ygh.maple.character.controller;

import kr.ygh.maple.character.dto.basic.Basic;
import kr.ygh.maple.character.service.CharacterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/character")
public class CharacterController {

    private final CharacterService characterService;

    @GetMapping("basic")
    public Basic basic(@RequestParam("name") String name) {
        return characterService.getBasic(name);
    }
}