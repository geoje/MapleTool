package kr.ygh.maple;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.ZoneId;

@SpringBootTest
class MapleToolApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void printDateKST() {
        LocalDate yesterday = LocalDate.now(ZoneId.of("Asia/Seoul")).minusDays(1);
        System.out.println("today = " + yesterday);
    }
}
