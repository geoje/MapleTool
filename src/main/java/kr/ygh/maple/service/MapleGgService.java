package kr.ygh.maple.service;

import kr.ygh.maple.model.MapleGgBypass;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class MapleGgService {

    @Value("${maplegg.api.url}")
    private String MAPLEGG_API_URL;
    @Value("${maplegg.api.path}")
    private String MAPLEGG_API_PATH;

    public Mono<MapleGgBypass> bypass(String name) {
        return WebClient
                .builder()
                .exchangeStrategies(ExchangeStrategies.builder().codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024)).build())
                .baseUrl(MAPLEGG_API_URL).build().get()
                .uri(MAPLEGG_API_PATH, name)
                .retrieve()
                .onStatus(HttpStatusCode::isError, NexonApiService::onRequestError)
                .bodyToMono(String.class)
                .map(MapleGgBypass::from);
    }
}
