package kr.ygh.maple.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableCaching
@Configuration
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager manager = new CaffeineCacheManager();
        manager.setCaffeine(Caffeine.newBuilder()
                .expireAfterWrite(getUntilNextPatch().toMillis(), TimeUnit.MILLISECONDS)
                .maximumSize(1000));
        return manager;
    }

    private Duration getUntilNextPatch() {
        LocalDateTime now = LocalDateTime.now();

        if (now.getDayOfWeek() == DayOfWeek.THURSDAY && now.getHour() < 7) {
            return Duration.between(now, now.withHour(7));
        }

        return Duration.between(now, now.toLocalDate().plusDays(1).atStartOfDay());
    }
}