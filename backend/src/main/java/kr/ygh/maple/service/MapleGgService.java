package kr.ygh.maple.service;

import kr.ygh.maple.dto.MapleGgBypass;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@Service
public class MapleGgService {

    private static final String MAPLEGG_API_PATH = "/api/v1/bypass/characters/{name}";
    
    @Value("${maplegg.api.url}")
    private String MAPLEGG_API_URL;

    public static Mono<? extends Throwable> onRequestError(ClientResponse response) {
        return response.bodyToMono(String.class)
                .flatMap(error -> Mono.error(new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        response.statusCode() + " from " + response.request().getMethod().name() + " " +
                                response.request().getURI().getPath() + " " + error)));
    }

    public Mono<MapleGgBypass> bypass(String name) {
        return WebClient
                .builder()
                .exchangeStrategies(ExchangeStrategies.builder().codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024)).build())
                .baseUrl(MAPLEGG_API_URL).build().get()
                .uri(MAPLEGG_API_PATH, name)
                .retrieve()
                .onStatus(HttpStatusCode::isError, MapleGgService::onRequestError)
                .bodyToMono(String.class)
                .map(MapleGgBypass::from);
    }
}
