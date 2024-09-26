import { Badge, Stack, useToast } from "@chakra-ui/react";
import ArtifactService from "../../service/union/artifact/artifact";
import { useEffect, useState } from "react";
import ArtifactLevel from "./artifactLevel/artifactLevel";
import EffectLevel from "./effectLevel/effectLevel";
import SelectEffect from "./select/selectEffect";
import {
  EFFECT_NAMES,
  MIN_ARTIFACT_LEVEL,
} from "../../service/union/artifact/artifactConstants";
import ResultGrid from "./result/result";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import UnionService from "../../service/union/union";
import { setUnionBasic } from "../../stores/unionSlice";
import { AxiosError } from "axios";
import BoardCard from "../../components/boardCard";

export default function Artifact() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const characterBasic = useAppSelector((state) => state.character.basic);
  const unionBasic = useAppSelector((state) => state.union.basic);

  const [artifactLevel, setArtifactLevel] = useState(
    unionBasic?.union_artifact_level ?? MIN_ARTIFACT_LEVEL
  );
  const [effectIndex, setEffectIndex] = useState(0);
  const [effectLevels, setEffectLevels] = useState<number[]>([]);
  const [effectNames, setEffectNames] = useState<string[]>([]);

  useEffect(() => {
    // Check character name
    if (
      characterBasic?.character_name == null ||
      characterBasic.character_name.trim() == ""
    ) {
      return;
    }

    // Request if empty
    if (unionBasic == null) {
      UnionService.requestBasic(characterBasic.character_name)
        .then((basic) => {
          dispatch(setUnionBasic(basic));
          toast({
            position: "top-right",
            status: "success",
            title: "유니온 기본 정보 등록됨",
            description: characterBasic.character_name,
            isClosable: true,
          });
          setArtifactLevel(basic.union_artifact_level);
        })
        .catch((reason: AxiosError) => {
          toast({
            position: "top-right",
            status: "error",
            title: `유니온 기본 정보 등록 실패 (${reason.message})`,
            description: Object(reason.response?.data).message,
            isClosable: true,
          });
        });
      return;
    }

    // Request new data
    UnionService.requestBasic(characterBasic.character_name)
      .then((basic) => {
        dispatch(setUnionBasic(basic));
        toast({
          position: "top-right",
          status: "success",
          title: "유니온 기본 정보 갱신됨",
          description: characterBasic.character_name,
          isClosable: true,
        });
      })
      .catch((reason: AxiosError) => {
        toast({
          position: "top-right",
          status: "warning",
          title: `유니온 기본 정보 갱신 실패 (${reason.message})`,
          description: Object(reason.response?.data).message,
          isClosable: true,
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initEffectLevels = ArtifactService.effectLevels(artifactLevel)[0];
    setEffectIndex(0);
    setEffectLevels(initEffectLevels);

    const unusedEffectNames = EFFECT_NAMES.filter(
      ({ full }) => !effectNames.some((existName) => existName == full)
    ).map(({ full }) => full);
    const newEffectNames = [...effectNames, ...unusedEffectNames].slice(
      0,
      initEffectLevels.length
    );
    setEffectNames(newEffectNames);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artifactLevel]);

  return (
    <>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard order={1} title="아티팩트 레벨">
          <ArtifactLevel
            value={artifactLevel}
            onChange={(value) => setArtifactLevel(value)}
          />
        </BoardCard>
        <BoardCard order={2} title="효과 레벨">
          <EffectLevel
            artifactLevel={artifactLevel}
            effectIndex={effectIndex}
            onChange={(index, newEffectLevels) => {
              setEffectIndex(index);
              setEffectLevels(newEffectLevels);

              const unusedEffectNames = EFFECT_NAMES.filter(
                ({ full }) =>
                  !effectNames.some((existName) => existName == full)
              ).map(({ full }) => full);
              const newEffectNames = [
                ...effectNames,
                ...unusedEffectNames,
              ].slice(0, newEffectLevels.length);
              setEffectNames(newEffectNames);
            }}
          />
        </BoardCard>
        <BoardCard order={3} title="효과 선택">
          <SelectEffect
            effectLevels={effectLevels}
            currentEffectNames={effectNames}
            onChange={(effectName, index) => {
              const symmetryIndex = effectNames.indexOf(effectName);
              const temp = [...effectNames];
              temp[index] = effectName;
              if (symmetryIndex != -1) temp[symmetryIndex] = effectNames[index];
              setEffectNames(temp);
            }}
          />
        </BoardCard>
      </Stack>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard
          order={4}
          title="배치도"
          right={
            <Badge>남은 AP {ArtifactService.remainPoint(artifactLevel)}</Badge>
          }
        >
          <ResultGrid
            levels={ArtifactService.crystals(artifactLevel).map(
              (crystal) => crystal.level
            )}
            effectNames={ArtifactService.crystalEffectIndexes(
              artifactLevel,
              effectIndex
            ).map((indexes) =>
              indexes.map((oneAddedEffectNameIndex) => {
                const fullEffectName = effectNames[oneAddedEffectNameIndex - 1];
                return (
                  EFFECT_NAMES.find(
                    (effectName) => effectName.full == fullEffectName
                  )?.abbreviate ?? ""
                );
              })
            )}
          />
        </BoardCard>
      </Stack>
    </>
  );
}
