package kr.ygh.maple.common.repository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.function.Supplier;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;

@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class RedisRepository<V> {

    private final RedisTemplate<String, Object> redisTemplate;
    private final String key;

    public Optional<V> find(String name) {
        HashOperations<String, String, V> ops = redisTemplate.opsForHash();
        return Optional.ofNullable(ops.get(key, name));
    }

    public V save(String name, V value) {
        HashOperations<String, String, V> ops = redisTemplate.opsForHash();
        ops.put(key, name, value);
        redisTemplate.expire(key, getExpire());
        return value;
    }

    public V computeIfAbsent(String name, Supplier<V> supplier) {
        return find(name).orElseGet(() -> save(name, supplier.get()));
    }

    protected Duration getExpire() {
        return getUntilNextQuarterHour();
    }

    private Duration getUntilNextQuarterHour() {
        LocalDateTime now = LocalDateTime.now();

        int nextQuarterHour = ((now.getMinute() / 15) + 1) * 15;
        LocalDateTime nextQuarter = now
                .withMinute(0)
                .withSecond(0)
                .withNano(0)
                .plusHours(now.getMinute() >= 45 ? 1 : 0)
                .withMinute(nextQuarterHour % 60);

        return Duration.between(now, nextQuarter);
    }
}
