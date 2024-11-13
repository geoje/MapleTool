package kr.ygh.maple.character.feign;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import kr.ygh.maple.character.dto.basic.Basic;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MapleClientTest {

    private static final Logger log = LoggerFactory.getLogger(MapleClientTest.class);
    @Autowired
    private MapleClient mapleClient;

    @Test
    @Disabled
    @DisplayName("한 번에 여러 요청을 호출한다.")
    void getBasicBulkRequest() throws InterruptedException {
        // given
        int count = 1000;
        ExecutorService executorService = Executors.newFixedThreadPool(count);
        CountDownLatch latch = new CountDownLatch(count);

        // when
        for (int i = 0; i < count; i++) {
            executorService.submit(() -> {
                try {
                    Basic basic = mapleClient.getBasic("새양");
                    log.info(basic.toString());
                } catch (Exception e) {
                    log.error(e.getMessage());
                } finally {
                    latch.countDown();
                }
            });
        }

        // then
        latch.await();
        executorService.shutdown();
    }
}
