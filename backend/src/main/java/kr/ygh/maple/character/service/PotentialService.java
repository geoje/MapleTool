package kr.ygh.maple.character.service;

import java.util.List;
import kr.ygh.maple.character.dto.itemEquipment.PotentialRequest;
import kr.ygh.maple.character.dto.itemEquipment.PotentialResponse;
import kr.ygh.maple.character.entity.Potential;
import kr.ygh.maple.character.repository.PotentialRepository;
import org.springframework.stereotype.Service;

@Service
public class PotentialService {

    private final PotentialRepository potentialRepository;
    private final PotentialPartMapper potentialPartMapper;

    public PotentialService(PotentialRepository potentialRepository) {
        this.potentialRepository = potentialRepository;
        this.potentialPartMapper = new PotentialPartMapper();
    }

    public List<PotentialResponse> getPotential(PotentialRequest potentialRequest) {
        final String part = potentialPartMapper.map(potentialRequest.part()).orElseThrow();

        Integer level = potentialRepository.findMaxLevelLessOrEqualThan(
                part, potentialRequest.level()
        );
        List<Potential> potentials = potentialRepository.findByTypeAndPartAndGradeAndLevel(
                potentialRequest.type(), part, potentialRequest.grade(), level
        );
        
        return potentials.stream().map(PotentialResponse::from).toList();
    }
}
