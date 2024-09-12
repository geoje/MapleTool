package kr.ygh.maple;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@EnableFeignClients
@EnableJpaRepositories(basePackages = {
        "kr.ygh.maple.character.repository.jpa",
//        "kr.ygh.maple.union.repository.jpa"
})
@EnableRedisRepositories(basePackages = {
        "kr.ygh.maple.character.repository.redis",
//        "kr.ygh.maple.union.repository.redis"
})
@ConfigurationPropertiesScan
@SpringBootApplication
public class MapleToolApplication {
    public static void main(String[] args) {
        SpringApplication.run(MapleToolApplication.class, args);
    }
}
