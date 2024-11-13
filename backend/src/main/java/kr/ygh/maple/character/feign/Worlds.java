package kr.ygh.maple.character.feign;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public enum Worlds {
    REBOOT2(2, "리부트2"),
    REBOOT(3, "리부트"),
    AURORA(4, "오로라"),
    RED(5, "레드"),
    ENOSIS(6, "이노시스"),
    UNION(7, "유니온"),
    SCANIA(8, "스카니아"),
    LUNA(9, "루나"),
    ZENITH(10, "제니스"),
    CROA(11, "크로아"),
    BERA(12, "베라"),
    ELYSIUM(13, "엘리시움"),
    ARCANE(14, "아케인"),
    NOVA(15, "노바"),
    BURNING(16, "버닝"),
    BURNING2(17, "버닝2"),
    BURNING3(18, "버닝3");

    private final int id;
    private final String name;

    Worlds(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public static String parseNameFromImage(String url) {
        Matcher matcher = Pattern.compile("(\\d+)(?=\\.png$)").matcher(url);
        if (!matcher.find()) {
            return "";
        }

        int worldId = Integer.parseInt(matcher.group(1));
        return Arrays.stream(values())
                .filter(world -> world.id == worldId)
                .findFirst()
                .map(world -> world.name)
                .orElse("");
    }
}
