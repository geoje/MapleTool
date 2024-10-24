package kr.ygh.maple.character.service;

import feign.Param;
import kr.ygh.maple.common.feign.NexonClient;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OcidService {

    private final NexonClient nexonClient;

    @Cacheable(value = "character:ocid", key = "#name")
    public String getOcid(@Param("name") String name) {
        return nexonClient.getOcid(name).ocid();
    }
}
