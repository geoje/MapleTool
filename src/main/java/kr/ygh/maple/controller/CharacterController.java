package kr.ygh.maple.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/character")
public class CharacterController {

    @GetMapping("item-equipment")
    public Map<String, Object> itemEquipment(Map<String, Object> req) {
        Map<String, Object> result = new HashMap<>();
        return result;
    }
}
