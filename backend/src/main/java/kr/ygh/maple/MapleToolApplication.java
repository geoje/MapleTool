package kr.ygh.maple;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class MapleToolApplication {
    public static void main(String[] args) {
        SpringApplication.run(MapleToolApplication.class, args);
    }
}
