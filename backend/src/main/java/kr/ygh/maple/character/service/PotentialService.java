package kr.ygh.maple.character.service;

import java.util.List;
import kr.ygh.maple.character.dto.itemEquipment.potential.PotentialRequest;
import kr.ygh.maple.character.dto.itemEquipment.potential.PotentialResponse;
import kr.ygh.maple.character.entity.Potential;
import kr.ygh.maple.character.repository.PotentialRepository;
import org.springframework.stereotype.Service;

@Service
public class PotentialService {

    private final PotentialRepository potentialRepository;

    public PotentialService(PotentialRepository potentialRepository) {
        this.potentialRepository = potentialRepository;
    }

    public List<PotentialResponse> getPotential(PotentialRequest potentialRequest) {
        String part = potentialRequest.part().getGroup();
        Integer level = potentialRepository.findMaxLevel(part, potentialRequest.level()).orElse(0);
        List<Potential> potentials = potentialRepository.findByTypeAndGradeAndPartAndLevel(
                potentialRequest.type().getValue(),
                potentialRequest.grade().getValue(),
                part,
                level
        );

        return potentials.stream().map(PotentialResponse::new).toList();
    }
}
