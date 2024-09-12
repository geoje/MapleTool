package kr.ygh.maple.config;

import feign.RequestInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class NexonFeignConfig {

    private final NexonProperties nexonProperties;

    @Bean
    public RequestInterceptor nexonRequestInterceptor() {
        return requestTemplate -> {
            requestTemplate.header("x-nxopen-api-key", nexonProperties.key());
        };

    }
}
