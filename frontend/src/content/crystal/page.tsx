import { IconButton, Stack } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";
import { FaPlusCircle } from "react-icons/fa";
import CharacterButton from "./character/characterButton";
import {
  BOSS_TYPE,
  BOSS_DIFFICULTY,
} from "../../service/user/crystal/bossConstants";
import BossPlan from "../../dto/user/crystal/bossPlan";

const sampleData: BossPlan[] = [
  {
    name: "수빈양",
    boss: [
      {
        type: BOSS_TYPE.MAGNUS,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.PAPULATUS,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.CRIMSON_QUEEN,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.VELLUM,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.LOTUS,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.DAMIEN,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.GUARDIAN_ANGEL_SLIME,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 2,
      },
      {
        type: BOSS_TYPE.LUCID,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.WILL,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 2,
      },
      {
        type: BOSS_TYPE.GLOOM,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.VERUS_HILLA,
        difficulty: BOSS_DIFFICULTY.NORMAL,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.DARKNELL,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 2,
      },
    ],
  },
  {
    name: "새벽쌍쌍",
    boss: [
      {
        type: BOSS_TYPE.ZZAKUM,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.MAGNUS,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.HILLA,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.PAPULATUS,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.PIERRE,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.CRIMSON_QUEEN,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.VON_BON,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.VELLUM,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.PINK_BEAN,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.CYGNUS,
        difficulty: BOSS_DIFFICULTY.NORMAL,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.LOTUS,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        type: BOSS_TYPE.DAMIEN,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
    ],
  },
];

export default function Crystal() {
  console.log(sampleData);

  return (
    <>
      <Stack>
        <BoardCard order={1} title="캐릭터 등록">
          <Stack>
            {sampleData.map((bossPlan, i) => (
              <CharacterButton key={"character-" + i} bossPlan={bossPlan} />
            ))}
            <IconButton
              aria-label="add"
              icon={<FaPlusCircle opacity={0.8} />}
            />
          </Stack>
        </BoardCard>
      </Stack>
      <Stack>
        <BoardCard order={2} title="통계"></BoardCard>
      </Stack>
    </>
  );
}
