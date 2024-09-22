package kr.ygh.maple.character.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class CharacterControllerTest {

    @LocalServerPort
    int port;

    void setUp() {

    }

    @Test
    @DisplayName("")
    void methodName() {
        // given

        // when

        // then
    }
}
