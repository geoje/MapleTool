package kr.ygh.maple.character.service;

import kr.ygh.maple.character.dto.ocid.OcidResponse;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "nexon")
public interface NexonClient {

    OcidResponse
}
