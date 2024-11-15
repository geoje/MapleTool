package kr.ygh.maple.character.controller;

import jakarta.validation.Valid;
import kr.ygh.maple.character.dto.basic.Basic;
import kr.ygh.maple.character.dto.itemEquipment.ItemEquipment;
import kr.ygh.maple.character.dto.itemEquipment.PotentialRequest;
import kr.ygh.maple.character.dto.itemEquipment.PotentialResponse;
import kr.ygh.maple.character.exception.MapleClientException;
import kr.ygh.maple.character.service.CharacterService;
import kr.ygh.maple.character.service.PotentialService;
import kr.ygh.maple.common.dto.NameRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("item-equipment/potentials")
    public List<PotentialResponse> potentials(@ModelAttribute @Valid PotentialRequest potentialRequest) {
        return potentialService.getPotentials(potentialRequest).responses();
    }

    @ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
    @ExceptionHandler(MapleClientException.class)
    public ProblemDetail handleProxyNotFound(MapleClientException ex) {
        return ProblemDetail.forStatusAndDetail(
                HttpStatus.TOO_MANY_REQUESTS,
                ex.getMessage()
        );
    }
}
