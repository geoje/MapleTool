package kr.ygh.maple.character.controller;

import jakarta.validation.Valid;
import java.util.List;
import kr.ygh.maple.character.dto.basic.Basic;
import kr.ygh.maple.character.dto.itemEquipment.ItemEquipment;
import kr.ygh.maple.character.dto.itemEquipment.PotentialRequest;
import kr.ygh.maple.character.dto.itemEquipment.PotentialResponse;
import kr.ygh.maple.character.service.CharacterService;
import kr.ygh.maple.character.service.PotentialService;
import kr.ygh.maple.common.dto.NameRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/character")
public class CharacterController {

    private final CharacterService characterService;
    private final PotentialService potentialService;

    @GetMapping("basic")
    public Basic basic(@ModelAttribute @Valid NameRequest nameRequest) {
        return characterService.getBasic(nameRequest.name());
    }

    @GetMapping("item-equipment")
    public ItemEquipment itemEquipment(@ModelAttribute @Valid NameRequest nameRequest) {
        return characterService.getItemEquipment(nameRequest.name());
    }

    @GetMapping("item-equipment/potential")
    public List<PotentialResponse> potential(@ModelAttribute @Valid PotentialRequest potentialRequest) {
        return potentialService.getPotential(potentialRequest);
    }
}
