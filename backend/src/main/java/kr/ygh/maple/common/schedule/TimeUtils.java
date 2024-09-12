package kr.ygh.maple.common.schedule;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class TimeUtils {

    public static long getSecUntilNextQuarterHour() {
        LocalDateTime now = LocalDateTime.now();

        int nextQuarterHour = ((now.getMinute() / 15) + 1) * 15;
        LocalDateTime nextQuarter = now
                .withMinute(0)
                .withSecond(0)
                .withNano(0)
                .plusHours(now.getMinute() >= 45 ? 1 : 0)
                .withMinute(nextQuarterHour % 60);

//        return ChronoUnit.SECONDS.between(now, nextQuarter);
        return 10;
    }

    public static long getMsUntilNextDay() {
        LocalDateTime now = LocalDateTime.now();

        LocalDateTime nextDay = now.plusDays(1)
                .withHour(0)
                .withMinute(0)
                .withSecond(0)
                .withNano(0);

        return ChronoUnit.SECONDS.between(now, nextDay);
    }
}
