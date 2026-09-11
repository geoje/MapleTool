package kr.ygh.maple.boss.controller;

import jakarta.validation.Valid;
import kr.ygh.maple.boss.dto.CharacterSchedule;
import kr.ygh.maple.boss.service.BossService;
import kr.ygh.maple.common.dto.NameRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boss")
public class BossController {

    private final BossService bossService;

    @GetMapping("schedule")
    public CharacterSchedule schedule(@ModelAttribute @Valid NameRequest nameRequest) {
        return bossService.readSchedule(nameRequest.name());
    }
}
