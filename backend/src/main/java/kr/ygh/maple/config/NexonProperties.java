package kr.ygh.maple.config;

import java.net.URL;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("nexon")
public record NexonProperties(URL url, String key) {
}
