package kr.ygh.maple.character.feign.proxy;

import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.Proxy.Type;
import java.net.URI;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Request.Builder;
import okhttp3.Response;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ProxyProvider {

    private final ScrapeClient scrapeClient;
    private final ConcurrentLinkedQueue<URI> proxies = new ConcurrentLinkedQueue<>();

    public List<Proxy> getSingleProxy() {
        URI uri = proxies.poll();
        if (uri == null) {
            throw new IllegalStateException("No proxy found");
        }
        proxies.add(uri);
        InetSocketAddress inetSocketAddress = InetSocketAddress.createUnresolved(uri.getHost(), uri.getPort());
        return List.of(new Proxy(Type.HTTP, inetSocketAddress));
    }

    public void removeProxy(URI uri) {
        proxies.remove(uri);
    }

    @Scheduled(initialDelay = 0, fixedRate = 600_000)
    public void retrieveValidProxies() {
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
        Request request = new Builder().url(uri.toString()).build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                proxies.add(uri);
                log.info("Successfully added proxy: {}", uri);
            }
        } catch (Exception ignored) {
        }
    }
}
