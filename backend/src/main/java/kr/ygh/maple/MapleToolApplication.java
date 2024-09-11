package kr.ygh.maple;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class MapleToolApplication {
    public static void main(String[] args) {
        SpringApplication.run(MapleToolApplication.class, args);
    }
}
