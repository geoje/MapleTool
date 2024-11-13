package kr.ygh.maple.character.feign;

import feign.codec.Decoder;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import kr.ygh.maple.character.dto.basic.Basic;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.context.annotation.Bean;

public class HtmlConfig {

    private final Map<Type, Function<Document, Object>> decoders;

    public HtmlConfig() {
        decoders = Map.of(Basic.class, this::parseBasic);
    }

    @Bean
    public Decoder htmlDecoder() {
        return (response, type) -> {
            try (InputStream inputStream = response.body().asInputStream()) {
                Document document = Jsoup.parse(inputStream, StandardCharsets.UTF_8.name(), response.request().url());
                return decoders.getOrDefault(type, Document::text).apply(document);
            }
        };
    }

    private Basic parseBasic(Document document) {
        Optional<Element> row = Optional.ofNullable(document.selectFirst("tr.search_com_chk"));
        Optional<Element> tdMain = row.map(tr -> tr.child(1));

        String characterName = tdMain
                .map(tr -> tr.selectFirst("dt > a"))
                .map(Element::text)
                .orElse("");
        Optional<String> worldImage = tdMain
                .map(tr -> tr.selectFirst("dt > a > img"))
                .map(img -> img.attr("src"));
        String worldName = worldImage
                .map(Worlds::parseNameFromImage)
                .orElse("");
        Optional<String> jobAndClass = tdMain
                .map(tr -> tr.selectFirst("dd"))
                .map(Element::text);
        String characterClass = jobAndClass
                .map(jc -> jc.split(" / "))
                .filter(jc -> jc.length > 1)
                .map(jc -> jc[1])
                .orElse("");
        long characterLevel = row
                .map(tr -> tr.child(2))
                .map(Element::text)
                .map(level -> level.replaceAll("\\D", ""))
                .map(Long::parseLong)
                .orElse(0L);
        long characterExp = row
                .map(tr -> tr.child(3))
                .map(Element::text)
                .map(exp -> exp.replaceAll("\\D", ""))
                .map(Long::parseLong)
                .orElse(0L);
        String guildName = row
                .map(tr -> tr.child(5))
                .map(Element::text)
                .orElse("");
        String characterImage = tdMain
                .map(tr -> tr.selectFirst("span > img"))
                .map(img -> img.attr("src"))
                .orElse("");

        return new Basic(null, characterName, worldName, "", characterClass,
                "", characterLevel, characterExp, "", guildName, characterImage);
    }
}
