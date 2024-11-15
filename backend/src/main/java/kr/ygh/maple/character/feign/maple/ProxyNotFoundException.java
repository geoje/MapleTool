package kr.ygh.maple.character.feign.maple;

public class ProxyNotFoundException extends RuntimeException {

    public ProxyNotFoundException() {
        super("Proxy not found");
    }
}
