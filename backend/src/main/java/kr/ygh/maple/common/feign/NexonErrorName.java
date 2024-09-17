package kr.ygh.maple.common.feign;

public enum NexonErrorName {
    OPENAPI00001("넥슨 API 서버에 문제가 발생하였습니다."),
    OPENAPI00002(""),
    OPENAPI00003(""),
    OPENAPI00004(""),
    OPENAPI00005(""),
    OPENAPI00006(""),
    OPENAPI00007(""),
    OPENAPI00008(""),
    OPENAPI00009(""),
    OPENAPI00010(""),
    OPENAPI00011("");

    private final String message;

    NexonErrorName(String message) {
        this.message = message;
    }
}
