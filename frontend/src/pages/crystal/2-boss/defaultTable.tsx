import {
  BOSS,
  BOSS_DIFFICULTY,
  BOSS_TYPE,
  MAX_BOSS_SELECTABLE,
} from "../../../constants/boss";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getMaxMembers } from "../../../services/boss";
import { putBossItem, removeBossItem } from "../../../stores/userSlice";
import Row from "./row";

export default function DefaultTable({ selected }: { selected: number }) {
  const dispatch = useAppDispatch();
  const bossPlans = useAppSelector((state) => state.user.bossPlans);
  const bossPlan = bossPlans[selected];

  return Object.entries(BOSS).map(([type, boss], i) => {
    const parsedType = type as BOSS_TYPE;
    const selectedPlanItem = bossPlan.boss.find(
      ({ type: t }) => t == parsedType
    );

    return (
      <Row
        key={"boss-" + i}
        icon={boss.icon}
        label={boss.abbreviate}
        difficulties={Object.entries(boss.prices).map(
          ([difficulty]) => difficulty as BOSS_DIFFICULTY
        )}
        selectedDifficulty={selectedPlanItem?.difficulty}
        maxMembers={getMaxMembers(
          type as BOSS_TYPE,
          selectedPlanItem?.difficulty
        )}
        members={selectedPlanItem?.members ?? 1}
        price={
          selectedPlanItem
            ? boss.prices[selectedPlanItem.difficulty]
            : undefined
        }
        isDisabled={
          !selectedPlanItem && bossPlan.boss.length >= MAX_BOSS_SELECTABLE
        }
        onDifficultyChange={(newDifficulty) =>
          dispatch(
            (newDifficulty ? putBossItem : removeBossItem)({
              index: selected,
              type: parsedType,
              difficulty: newDifficulty,
            })
          )
        }
        onMembersChage={(members) =>
          dispatch(
            putBossItem({
              index: selected,
              type: parsedType,
              members,
            })
          )
        }
      />
    );
  });
}
