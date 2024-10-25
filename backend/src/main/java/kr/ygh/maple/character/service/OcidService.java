package kr.ygh.maple.character.service;

import kr.ygh.maple.common.feign.NexonClient;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OcidService {

    private final NexonClient nexonClient;

    @Cacheable(value = "character:ocid", key = "#p0")
    public String getOcid(String name) {
        return nexonClient.getOcid(name).ocid();
    }
}
