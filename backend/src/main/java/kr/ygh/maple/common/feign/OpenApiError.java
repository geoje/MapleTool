package kr.ygh.maple.common.feign;

import java.util.Arrays;
import java.util.NoSuchElementException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum OpenApiError {
    INTERNAL_SERVER_ERROR("OPENAPI00001", HttpStatus.BAD_GATEWAY, "넥슨 API 에서 오류가 발생하였습니다."),
    UNAUTHORIZED_ACCESS("OPENAPI00002", HttpStatus.INTERNAL_SERVER_ERROR, "넥슨 API 권한이 없습니다."),
    INVALID_IDENTIFIER("OPENAPI00003", HttpStatus.INTERNAL_SERVER_ERROR, "접속한지 오래 되었거나 유효하지 않은 식별자입니다."),
    INVALID_PARAMETER("OPENAPI00004", HttpStatus.BAD_REQUEST, "캐릭터가 존재하지 않거나 유효하지 않은 요청입니다."),
    INVALID_API_KEY("OPENAPI00005", HttpStatus.INTERNAL_SERVER_ERROR, "유효하지 않은 API 키입니다."),
    INVALID_GAME_OR_PATH("OPENAPI00006", HttpStatus.INTERNAL_SERVER_ERROR, "유효하지 않은 게임 또는 API 경로입니다."),
    CALL_LIMIT_EXCEEDED("OPENAPI00007", HttpStatus.TOO_MANY_REQUESTS, "호출 횟수가 많습니다. 잠시 후 다시 시도해주세요."),
    DATA_BEING_PREPARED("OPENAPI00009", HttpStatus.BAD_GATEWAY, "넥슨 API 데이터 준비 중입니다."),
    SERVICE_UNDER_MAINTENANCE("OPENAPI00010", HttpStatus.BAD_GATEWAY, "게임 점검 중입니다."),
    API_UNDER_MAINTENANCE("OPENAPI00011", HttpStatus.BAD_GATEWAY, "넥슨 API 점검 중입니다.");

    private final String code;
    private final HttpStatus responseStatus;
    private final String responseMessage;

    public static OpenApiError from(String codeIncluded) {
        return Arrays.stream(values())
                .filter(error -> codeIncluded.contains(error.code))
                .findAny()
                .orElseThrow(NoSuchElementException::new);
    }
}
