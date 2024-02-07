package kr.ygh.maple.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ygh.maple.model.MapleGgBypass;
import kr.ygh.maple.model.character.CharacterBasic;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootTest
@ActiveProfiles("local")
public class MapleGgServiceTest {

    @Autowired
    MapleGgService mapleGgService;
    @Value("${maplegg.api.url}")
    private String MAPLEGG_API_URL;
    @Value("${maplegg.api.path}")
    private String MAPLEGG_API_PATH;

    @Test
    void requestWork() {
        MapleGgBypass bypass = mapleGgService.bypass("수빈양").block();
        System.out.println("bypass.characterBasic() = " + bypass.characterBasic());
    }

    @Test
    void requestManually() throws JsonProcessingException {
        String json =
                WebClient
                        .builder()
                        .exchangeStrategies(ExchangeStrategies.builder().codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024)).build())
                        .baseUrl(MAPLEGG_API_URL).build().get()
                        .uri(MAPLEGG_API_PATH, "수빈양")
                        .retrieve()
                        .bodyToMono(String.class)
                        .block();


        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(json);
        JsonNode data = root.get("data");
        CharacterBasic basic = mapper.treeToValue(data.get("characterBasic"), CharacterBasic.class);

        System.out.println("basic = " + basic);
    }
}
