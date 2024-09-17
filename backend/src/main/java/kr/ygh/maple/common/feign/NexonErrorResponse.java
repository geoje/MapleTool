package kr.ygh.maple.common.feign;

public record NexonErrorResponse(NexonErrorName name, String message) {
}
