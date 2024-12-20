package kr.ygh.maple.common.exception;

import feign.FeignException;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import kr.ygh.maple.common.feign.OpenApiError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException ex) {
        ProblemDetail detail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "입력 값이 잘못되었습니다.");

        Map<String, String> fieldMessages = ex.getBindingResult().getFieldErrors().stream().collect(Collectors.toMap(
                FieldError::getField,
                error -> Optional.ofNullable(error.getDefaultMessage()).orElse("")
        ));
        detail.setProperty("fields", fieldMessages);

        return detail;
    }

    @ExceptionHandler(FeignException.class)
    public ProblemDetail handleFeign(FeignException ex, HttpServletResponse response) {
        try {
            OpenApiError openApiError = OpenApiError.from(ex.contentUTF8());
            HttpStatus status = openApiError.getResponseStatus();
            response.setStatus(status.value());

            return ProblemDetail.forStatusAndDetail(status, openApiError.getResponseMessage());
        } catch (NoSuchElementException e) {
            log.error(ex.getMessage(), ex);

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ProblemDetail.forStatusAndDetail(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "서버에서 넥슨 API 호출 중 알 수 없는 문제가 발생하였습니다."
            );
        }
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NoHandlerFoundException.class)
    public ProblemDetail handleNoEndpoint() {
        return ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST,
                "잘못된 요청입니다."
        );
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(RuntimeException.class)
    public ProblemDetail handle(RuntimeException ex) {
        log.error(ex.getMessage(), ex);

        return ProblemDetail.forStatusAndDetail(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "서버에 문제가 발생하였습니다."
        );
    }
}
