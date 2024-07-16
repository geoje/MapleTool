import { IconButton, Stack } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";
import { FaPlusCircle } from "react-icons/fa";
import CharacterButton from "./character/characterButton";
import {
  BOSS,
  BOSS_DIFFICULTY,
} from "../../service/user/crystal/bossConstants";

export interface CharacterBoss {
  name: string;
  boss: {
    icon: string;
    difficulty: BOSS_DIFFICULTY;
    partMembers: number;
  }[];
}

const sampleData: CharacterBoss[] = [
  {
    name: "수빈양",
    boss: [
      {
        icon: BOSS.MAGNUS.icon,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        icon: BOSS.PAPULATUS.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        icon: BOSS.CRIMSON_QUEEN.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        icon: BOSS.VELLUM.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        icon: BOSS.LOTUS.icon,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        icon: BOSS.DAMIEN.icon,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        icon: BOSS.GUARDIAN_ANGEL_SLIME.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 2,
      },
      {
        icon: BOSS.LUCID.icon,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        icon: BOSS.WILL.icon,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 2,
      },
      {
        icon: BOSS.GLOOM.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        icon: BOSS.VERUS_HILLA.icon,
        difficulty: BOSS_DIFFICULTY.NORMAL,
        partMembers: 1,
      },
      {
        icon: BOSS.DARKNELL.icon,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 2,
      },
    ],
  },
  {
    name: "새벽쌍쌍",
    boss: [
      {
        icon: BOSS.ZZAKUM.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        icon: BOSS.MAGNUS.icon,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        icon: BOSS.HILLA.icon,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        icon: BOSS.PAPULATUS.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        icon: BOSS.PIERRE.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        icon: BOSS.CRIMSON_QUEEN.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        icon: BOSS.VON_BON.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        icon: BOSS.VELLUM.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        icon: BOSS.PINK_BEAN.icon,
        difficulty: BOSS_DIFFICULTY.CHAOS,
        partMembers: 1,
      },
      {
        icon: BOSS.CYGNUS.icon,
        difficulty: BOSS_DIFFICULTY.NORMAL,
        partMembers: 1,
      },
      {
        icon: BOSS.LOTUS.icon,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
      {
        icon: BOSS.DAMIEN.icon,
        difficulty: BOSS_DIFFICULTY.HARD,
        partMembers: 1,
      },
    ],
  },
];

export default function Crystal() {
  return (
    <>
      <Stack>
        <BoardCard order={1} title="캐릭터 등록">
          <Stack>
            {sampleData.map((characterBoss, i) => (
              <CharacterButton
                key={"character-" + i}
                characterBoss={characterBoss}
              />
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
