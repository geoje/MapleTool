package kr.ygh.maple.union.service;

import kr.ygh.maple.character.service.OcidService;
import kr.ygh.maple.common.feign.NexonClient;
import kr.ygh.maple.union.dto.basic.Basic;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UnionService {

    private final NexonClient nexonClient;
    private final OcidService ocidService;

    @Cacheable(value = "union:basic", key = "#p0")
    public Basic readBasic(String name) {
        return nexonClient.getUnionBasic(ocidService.getOcid(name));
    }
}
