package kr.ygh.maple.model.union;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import kr.ygh.maple.model.union.subset.UnionRaiderBlock;
import kr.ygh.maple.model.union.subset.UnionRaiderStat;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record UnionRaider(String date, String[] union_raider_stat, String[] union_occupied_stat,
                          UnionRaiderStat[] union_inner_stat, UnionRaiderBlock[] union_block
) {
}
