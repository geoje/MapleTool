package kr.ygh.maple.service;

import kr.ygh.maple.model.character.CharacterBasic;
import kr.ygh.maple.model.character.CharacterItemEquipment;
import kr.ygh.maple.model.character.CharacterOcid;
import kr.ygh.maple.model.union.UnionArtifact;
import kr.ygh.maple.model.union.UnionBasic;
import kr.ygh.maple.model.union.UnionRaider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;

@Service
public class NexonApiService {

    @Value("${nexon.api.url}")
    private String NEXON_API_URL;
    @Value("${nexon.api.key}")
    private String NEXON_API_KEY;

    public static Mono<? extends Throwable> onRequestError(ClientResponse response) {
        return response.bodyToMono(String.class)
                .flatMap(error -> Mono.error(new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        response.statusCode() + " from " + response.request().getMethod().name() + " " +
                                response.request().getURI().getPath() + " " + error)));
    }

    private static String yesterday() {
        return LocalDate.now(ZoneId.of("Asia/Seoul")).minusDays(1).toString();
    }

    public static boolean isCollectingTime() {
        return LocalTime.now(ZoneId.of("Asia/Seoul")).getHour() == 0;
    }

    private <T> Mono<T> requestApi(Class<T> elementClass, String uri, Object... variables) {
        return WebClient.builder()
                .exchangeStrategies(ExchangeStrategies.builder().codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024)).build())
                .baseUrl(NEXON_API_URL).build().get()
                .uri(uri, variables)
                .header("x-nxopen-api-key", NEXON_API_KEY)
                .retrieve()
                .onStatus(HttpStatusCode::isError, NexonApiService::onRequestError)
                .bodyToMono(elementClass);
    }

    public Mono<CharacterOcid> characterOcid(String name) {
        return requestApi(CharacterOcid.class, "/maplestory/v1/id?character_name={name}", name);
    }

    public Mono<CharacterBasic> characterBasic(String ocid) {
        return requestApi(CharacterBasic.class, "/maplestory/v1/character/basic?ocid={ocid}&date={date}", ocid, yesterday());
    }

    public Mono<CharacterItemEquipment> characterItemEquipment(String ocid) {
        return requestApi(CharacterItemEquipment.class, "/maplestory/v1/character/item-equipment?ocid={ocid}&date={date}", ocid, yesterday());
    }

    public Mono<UnionBasic> unionBasic(String ocid) {
        return requestApi(UnionBasic.class, "/maplestory/v1/user/union?ocid={ocid}&date={date}", ocid, yesterday());
    }

    public Mono<UnionRaider> unionRaider(String ocid) {
        return requestApi(UnionRaider.class, "/maplestory/v1/user/union-raider?ocid={ocid}&date={date}", ocid, yesterday());
    }

    public Mono<UnionArtifact> unionArtifact(String ocid) {
        return requestApi(UnionArtifact.class, "/maplestory/v1/user/union-artifact?ocid={ocid}&date={date}", ocid, yesterday());
    }
}
