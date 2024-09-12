package kr.ygh.maple.common.schedule;

import org.springframework.data.redis.core.TimeToLive;

public interface ExpirableNextQuarterHour {

    @TimeToLive
    default long timeToLive() {
        return TimeUtils.getSecUntilNextQuarterHour();
    }
}
