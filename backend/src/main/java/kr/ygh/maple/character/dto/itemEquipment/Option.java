package kr.ygh.maple.character.dto.itemEquipment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Option(String str, String dex, @JsonProperty("int") String intellect,
                     String luk, String max_hp, String max_mp, String attack_power,
                     String magic_power, String armor, String speed, String jump,
                     String boss_damage,
                     String ignore_monster_armor, String all_stat, String damage,
                     long equipment_level_decrease, String max_hp_rate,
                     String max_mp_rate, long base_equipment_level) {
}
