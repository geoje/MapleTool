package kr.ygh.maple.character.service;

import kr.ygh.maple.common.feign.OpenApiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OcidService {

    private final OpenApiClient openApiClient;

    @Cacheable(value = "character:ocid", key = "#p0")
    public String getOcid(String name) {
        return openApiClient.getOcid(name).ocid();
    }
}
