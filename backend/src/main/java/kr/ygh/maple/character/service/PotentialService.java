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

        Integer level = potentialRepository.findMaxLevel(part, potentialRequest.level()).orElse(0);
        List<Potential> potentials = potentialRepository.findByTypeAndGradeAndPartAndLevel(
                potentialRequest.type(), potentialRequest.grade(), part, level
        );

        return potentials.stream().map(PotentialResponse::new).toList();
    }
}
