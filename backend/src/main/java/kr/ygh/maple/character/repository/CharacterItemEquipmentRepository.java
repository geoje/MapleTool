package kr.ygh.maple.character.repository;


import kr.ygh.maple.character.dto.itemEquipment.ItemEquipment;
import kr.ygh.maple.common.repository.RedisRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CharacterItemEquipmentRepository extends RedisRepository<ItemEquipment> {

    protected CharacterItemEquipmentRepository(RedisTemplate<String, Object> redisTemplate) {
        super(redisTemplate, "character:item-equipment");
    }
}
