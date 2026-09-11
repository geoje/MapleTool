package kr.ygh.maple.character.feign.proxy;

import feign.codec.Decoder;
import org.springframework.context.annotation.Bean;

import java.io.BufferedReader;
import java.net.URI;
import java.nio.charset.StandardCharsets;

public class ScrapeConfig {

    @Bean
    public Decoder htmlDecoder() {
        return (response, type) ->
                new BufferedReader(response.body().asReader(StandardCharsets.UTF_8))
                        .lines()
                        .map(URI::create)
                        .toList();

    }
}
