import { Stack, useToast } from "@chakra-ui/react";
import ArtifactService from "../../service/union/artifact/artifact";
import { useEffect, useState } from "react";
import ArtifactLevel from "./artifactLevel";
import EffectLevel from "./effectLevel";
import SelectEffect from "./selectEffect";
import {
  EFFECT_NAMES,
  MIN_ARTIFACT_LEVEL,
} from "../../service/union/artifact/artifactConstants";
import ResultGrid from "./result";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import DateUtil from "../../util/date";
import UnionService from "../../service/union/union";
import { setUnionBasic } from "../../reducer/unionSlice";
import { AxiosError } from "axios";

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

    // Use cached
    if (DateUtil.isYesterday(unionBasic)) {
      return;
    }

    // Request new data
    UnionService.requestBasic(characterBasic.character_name)
      .then((basic) => {
        if (DateUtil.compare(unionBasic.date, basic.date) >= 0) return;
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
          status: "error",
          title: `유니온 기본 정보 갱신 실패 (${reason.message})`,
          description: Object(reason.response?.data).message,
          isClosable: true,
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initEffectLevels =
      ArtifactService.generateEffectLevels(artifactLevel)[0];
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
      <Stack width={["100%", "100%", "auto"]}>
        <ArtifactLevel
          value={artifactLevel}
          onChange={(value) => setArtifactLevel(value)}
        />
        <EffectLevel
          artifactLevel={artifactLevel}
          effectIndex={effectIndex}
          onChange={(index, newEffectLevels) => {
            setEffectIndex(index);
            setEffectLevels(newEffectLevels);

            const unusedEffectNames = EFFECT_NAMES.filter(
              ({ full }) => !effectNames.some((existName) => existName == full)
            ).map(({ full }) => full);
            const newEffectNames = [...effectNames, ...unusedEffectNames].slice(
              0,
              newEffectLevels.length
            );
            setEffectNames(newEffectNames);
          }}
        />
        <SelectEffect
          effectLevels={effectLevels}
          currentEffectNames={effectNames}
          onChange={(effectName, index) => {
            const temp = [...effectNames];
            temp[index] = effectName;
            setEffectNames(temp);
          }}
        />
      </Stack>
      <Stack>
        <ResultGrid
          levels={ArtifactService.getCrystals(artifactLevel).map(
            (crystal) => crystal.level
          )}
          effectNames={ArtifactService.getCrystalEffectIndexes(
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
      </Stack>
    </>
  );
}
