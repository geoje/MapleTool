package kr.ygh.maple.union.controller;

import jakarta.validation.Valid;
import kr.ygh.maple.common.dto.NameRequest;
import kr.ygh.maple.union.dto.basic.Basic;
import kr.ygh.maple.union.service.UnionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/union")
public class UnionController {

    private final UnionService unionService;

    @GetMapping("basic")
    public Basic basic(@ModelAttribute @Valid NameRequest nameRequest) {
        return unionService.readBasic(nameRequest.name());
    }
}
