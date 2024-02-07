package kr.ygh.maple.controller;

import kr.ygh.maple.model.character.CharacterBasic;
import kr.ygh.maple.model.character.CharacterOcid;
import kr.ygh.maple.service.NexonApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/api/character", produces = MediaType.APPLICATION_JSON_VALUE)
public class CharacterController {

    @Autowired
    private NexonApiService nexonApiService;

    private static void validateBlankOrEmpty(String data, String reason) {
        if (data.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, reason);
        }
    }

    @GetMapping("ocid")
    public Mono<CharacterOcid> ocid(@RequestParam("name") String name) {
        validateBlankOrEmpty(name, "Query character_name is blank or empty");

        return nexonApiService.ocid(name);
    }

    @GetMapping("basic")
    public Mono<CharacterBasic> basic(@RequestParam("ocid") String ocid) {
        validateBlankOrEmpty(ocid, "Query ocid is blank or empty");
        return nexonApiService.basic(ocid);
    }
}
