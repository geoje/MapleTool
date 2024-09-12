package kr.ygh.maple.union.controller;

import kr.ygh.maple.union.dto.basic.BasicResponse;
import kr.ygh.maple.union.service.UnionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/union")
public class UnionController {

    private final UnionService unionService;

    @GetMapping("basic")
    public BasicResponse basic(@RequestParam("name") String name) {
        return unionService.readBasic(name).data();
    }
}
