package kr.ygh.maple.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("nexon")
public record NexonProperties(String url, String key) {
}
