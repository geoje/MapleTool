package kr.ygh.maple.character.feign.maple;

import kr.ygh.maple.character.feign.proxy.ScrapeClient;
import lombok.RequiredArgsConstructor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Request.Builder;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.*;
import java.net.Proxy.Type;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
@RequiredArgsConstructor
public class MapleProxySelector extends ProxySelector {

    private final ScrapeClient scrapeClient;
    private final ConcurrentLinkedQueue<URI> proxies = new ConcurrentLinkedQueue<>();

    @Value("${spring.cloud.openfeign.client.config.maple.url}")
    private String mapleUrl;

    @Override
    public List<Proxy> select(URI uri) {
        URI proxyUri = proxies.poll();
        if (proxyUri == null) {
            throw new IllegalStateException("Proxy not found");
        }
        proxies.add(proxyUri);
        InetSocketAddress inetSocketAddress = InetSocketAddress.createUnresolved(
                proxyUri.getHost(),
                proxyUri.getPort()
        );
        return List.of(new Proxy(Type.HTTP, inetSocketAddress));
    }

    @Override
    public void connectFailed(URI uri, SocketAddress sa, IOException ioe) {
        if (sa instanceof InetSocketAddress isa) {
            String url = String.format("http://%s:%d", isa.getHostString(), isa.getPort());
            removeProxy(URI.create(url));
        }
    }

    public void removeProxy(URI uri) {
        proxies.remove(uri);
    }

    @Scheduled(initialDelay = 0, fixedRate = 600_000)
    public void updateValidProxies() {
        proxies.clear();
        try (ExecutorService executor = Executors.newCachedThreadPool()) {
            scrapeClient.get().stream()
                    .filter(uri -> !proxies.contains(uri))
                    .forEach(uri -> executor.submit(() -> addProxyIfRequestSuccess(uri)));
        }
    }

    private void addProxyIfRequestSuccess(URI uri) {
        if (proxies.contains(uri)) {
            return;
        }

        Proxy proxy = new Proxy(Type.HTTP, InetSocketAddress.createUnresolved(uri.getHost(), uri.getPort()));
        okhttp3.OkHttpClient client = new OkHttpClient.Builder().proxy(proxy).build();
        Request request = new Builder().url(mapleUrl).build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                proxies.add(uri);
            }
        } catch (Exception ignored) {
        }
    }
}
