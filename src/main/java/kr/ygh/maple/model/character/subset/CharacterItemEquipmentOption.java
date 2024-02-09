package kr.ygh.maple.model.character.subset;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record CharacterItemEquipmentOption(String str, String dex, @JsonProperty("int") String intellect,
                                           String luk, String max_hp, String max_mp, String attack_power,
                                           String magic_power, String armor, String speed, String jump,
                                           String boss_damage,
                                           String ignore_monster_armor, String all_stat, String damage,
                                           long equipment_level_decrease, String max_hp_rate,
                                           String max_mp_rate) {
}
