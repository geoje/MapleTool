package kr.ygh.maple.character.feign.proxy;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProxyProvider {

    private final ScrapeClient scrapeClient;
    private final List<URI> proxies = new ArrayList<>();

    public Proxy getNextProxy() {
        synchronized (proxies) {
            if (proxies.isEmpty()) {
                proxies.addAll(scrapeClient.get());
            }
        }
        URI uri = proxies.removeFirst();
        return new Proxy(Proxy.Type.HTTP, InetSocketAddress.createUnresolved(uri.getHost(), uri.getPort()));
    }
}
