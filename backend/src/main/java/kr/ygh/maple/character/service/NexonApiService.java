package kr.ygh.maple.character.service;

import java.time.LocalTime;
import java.time.ZoneId;
import kr.ygh.maple.character.dto.basic.BasicResponse;
import kr.ygh.maple.character.dto.itemEquipment.ItemEquipmentResponse;
import kr.ygh.maple.character.dto.ocid.OcidResponse;
import kr.ygh.maple.union.dto.artifact.UnionArtifact;
import kr.ygh.maple.union.dto.basic.UnionBasic;
import kr.ygh.maple.union.dto.raider.UnionRaider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class NexonApiService {

    @Value("${nexon.api.url}")
    private String NEXON_API_URL;
    @Value("${nexon.api.key}")
    private String NEXON_API_KEY;

    public static boolean isCollectingTime() {
        return LocalTime.now(ZoneId.of("Asia/Seoul")).getHour() == 0;
    }

    private <T> Mono<T> requestApi(Class<T> elementClass, String uri, Object... variables) {
        return WebClient.builder()
                .exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024)).build())
                .baseUrl(NEXON_API_URL).build().get()
                .uri(uri, variables)
                .header("x-nxopen-api-key", NEXON_API_KEY)
                .retrieve()
                .onStatus(HttpStatusCode::isError, MapleGgService::onRequestError)
                .bodyToMono(elementClass);
    }

    public Mono<OcidResponse> characterOcid(String name) {
        return requestApi(OcidResponse.class, "/maplestory/v1/id?character_name={name}", name);
    }

    public Mono<BasicResponse> characterBasic(String ocid) {
        return requestApi(BasicResponse.class, "/maplestory/v1/character/basic?ocid={ocid}", ocid);
    }

    public Mono<ItemEquipmentResponse> characterItemEquipment(String ocid) {
        return requestApi(ItemEquipmentResponse.class, "/maplestory/v1/character/item-equipment?ocid={ocid}", ocid);
    }

    public Mono<UnionBasic> unionBasic(String ocid) {
        return requestApi(UnionBasic.class, "/maplestory/v1/user/union?ocid={ocid}", ocid);
    }

    public Mono<UnionRaider> unionRaider(String ocid) {
        return requestApi(UnionRaider.class, "/maplestory/v1/user/union-raider?ocid={ocid}", ocid);
    }

    public Mono<UnionArtifact> unionArtifact(String ocid) {
        return requestApi(UnionArtifact.class, "/maplestory/v1/user/union-artifact?ocid={ocid}", ocid);
    }
}
