package kr.ygh.maple.character.repository;


import java.time.Duration;
import java.time.LocalDateTime;
import kr.ygh.maple.character.dto.ocid.Ocid;
import kr.ygh.maple.common.repository.RedisRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CharacterOcidRepository extends RedisRepository<Ocid> {

    protected CharacterOcidRepository(RedisTemplate<String, String> redisTemplate) {
        super(redisTemplate, "character:ocid");
    }

    @Override
    protected Duration getExpire() {
        return getUntilNextDay();
    }

    private Duration getUntilNextDay() {
        LocalDateTime now = LocalDateTime.now();

        LocalDateTime nextDay = now.plusDays(1)
                .withHour(0)
                .withMinute(0)
                .withSecond(0)
                .withNano(0);

        return Duration.between(now, nextDay);
    }
}
