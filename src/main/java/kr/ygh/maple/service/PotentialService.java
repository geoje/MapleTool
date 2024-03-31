package kr.ygh.maple.service;

import kr.ygh.maple.dto.character.itemEquipment.PotentialDto;
import kr.ygh.maple.entity.Potential;
import kr.ygh.maple.repository.PotentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class PotentialService {

    private final PotentialRepository potentialRepository;

    public Mono<List<PotentialDto>> potential(String part, String grade, int level) {
        CompletableFuture<Integer> existLevelFuture = CompletableFuture.supplyAsync(() ->
                potentialRepository.findMaxLevelLessOrEqualThan(part, level));
        CompletableFuture<List<Potential>> potentialsFuture = existLevelFuture.thenApplyAsync(existLevel ->
                potentialRepository.findAllByPartAndGradeAndLevel(part, grade, existLevel));

        return Mono.fromFuture(potentialsFuture)
                .map(potentials -> potentials.stream().map(PotentialDto::from).toList());
    }
}
