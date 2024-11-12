package kr.ygh.maple.union.service;

import kr.ygh.maple.character.service.OcidService;
import kr.ygh.maple.common.feign.OpenApiClient;
import kr.ygh.maple.union.dto.basic.Basic;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UnionService {

    private final OpenApiClient openApiClient;
    private final OcidService ocidService;

    @Cacheable(value = "union:basic", key = "#p0")
    public Basic readBasic(String name) {
        return openApiClient.getUnionBasic(ocidService.getOcid(name));
    }
}
