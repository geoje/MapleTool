package kr.ygh.maple.character.feign.maple;

import feign.codec.Decoder;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.ProxySelector;
import java.net.SocketAddress;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import kr.ygh.maple.character.dto.basic.Basic;
import kr.ygh.maple.character.feign.proxy.ProxyProvider;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.context.annotation.Bean;

@Slf4j
public class MapleConfig {

    private static final String OPEN_API_RELEASED_DATE_TIME = "2023-12-21T00:00+09:00";

    private final Map<Type, Function<Document, Object>> decoders;

    public MapleConfig() {
        decoders = Map.of(Basic.class, this::parseBasic);
    }

    @Bean
    public feign.okhttp.OkHttpClient okHttpClient(ProxyProvider proxyProvider) {
        okhttp3.OkHttpClient okHttpClient = new okhttp3.OkHttpClient.Builder()
                .proxySelector(new ProxySelector() {
                    @Override
                    public List<Proxy> select(URI uri) {
                        List<Proxy> singleProxy = proxyProvider.getSingleProxy();
                        log.info("Proxy selected: {}", singleProxy);
                        return singleProxy;
                    }

                    @Override
                    public void connectFailed(URI uri, SocketAddress sa, IOException ioe) {
                        if (sa instanceof InetSocketAddress isa) {
                            String url = String.format("http://%s:%d", isa.getHostString(), isa.getPort());
                            proxyProvider.removeProxy(URI.create(url));
                        }
                    }
                })
                .build();
        return new feign.okhttp.OkHttpClient(okHttpClient);
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

        return new Basic(OPEN_API_RELEASED_DATE_TIME, characterName, worldName, "", characterClass,
                "", characterLevel, characterExp, "", guildName, characterImage);
    }
}
