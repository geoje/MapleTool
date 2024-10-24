package kr.ygh.maple.config;

import jakarta.annotation.Nullable;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDateTime;
import kr.ygh.maple.character.dto.itemEquipment.PotentialRequest;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@EnableCaching
@Configuration
public class RedisConfig {

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
        RedisCacheConfiguration configuration = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(this::calculateTtl)
                .serializeKeysWith(
                        RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(
                        new GenericJackson2JsonRedisSerializer()));

        return RedisCacheManager.builder(redisConnectionFactory)
                .cacheDefaults(configuration)
                .build();
    }

    private Duration calculateTtl(Object key, @Nullable Object value) {
        if (key.getClass() == PotentialRequest.class) {
            return Duration.ZERO;
        }
        if (value == null) {
            return Duration.ofMinutes(15);
        }
        if (value.getClass() == String.class) {
            return getUntilNextPatch();
        }

        return Duration.ofMinutes(15);
    }

    private Duration getUntilNextPatch() {
        LocalDateTime now = LocalDateTime.now();

        if (now.getDayOfWeek() == DayOfWeek.THURSDAY && now.getHour() < 7) {
            return Duration.between(now, now.withHour(7));
        }

        return Duration.between(now, now.toLocalDate().plusDays(1).atStartOfDay());
    }
}
