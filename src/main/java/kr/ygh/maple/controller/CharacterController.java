package kr.ygh.maple.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.ZoneId;

@RestController
@RequestMapping("/api/character")
public class CharacterController {

    @Value("${nexon.api.url}")
    private String NEXON_API_URL;
    @Value("${nexon.api.key}")
    private String NEXON_API_KEY;

    private static void validateBlankOrEmpty(String data, String reason) {
        if (data.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, reason);
        }
    }

    private static Mono<? extends Throwable> handleError(ClientResponse response) {
        return response.bodyToMono(String.class)
                .flatMap(error -> Mono.error(new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        response.statusCode() + " from " + response.request().getMethod().name() + " " +
                                response.request().getURI().getPath() + " " + error)));
    }

    @GetMapping("ocid")
    public Mono<String> ocid(@RequestParam("character_name") String name) {
        validateBlankOrEmpty(name, "Query character_name is blank or empty");

        return WebClient.create(NEXON_API_URL).get()
                .uri("/maplestory/v1/id?character_name={name}", name)
                .header("x-nxopen-api-key", NEXON_API_KEY)
                .retrieve()
                .onStatus(HttpStatusCode::isError, CharacterController::handleError)
                .bodyToMono(String.class);
    }

    @GetMapping("basic")
    public Mono<String> basic(@RequestParam("ocid") String ocid) {
        validateBlankOrEmpty(ocid, "Query ocid is blank or empty");

        return WebClient.create(NEXON_API_URL).get()
                .uri("/maplestory/v1/character/basic?ocid={ocid}&date={date}",
                     ocid,
                     LocalDate.now(ZoneId.of("Asia/Seoul")).minusDays(1).toString()
                )
                .header("x-nxopen-api-key", NEXON_API_KEY)
                .retrieve()
                .onStatus(HttpStatusCode::isError, CharacterController::handleError)
                .bodyToMono(String.class);
    }
}
