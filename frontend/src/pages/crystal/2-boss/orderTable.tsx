import {
  BOSS,
  BOSS_DIFFICULTY,
  MAX_BOSS_SELECTABLE,
  BOSS_TYPE,
} from "../../../constants/boss";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getMaxMembers } from "../../../utils/boss";
import { removeBossItem, putBossItem } from "../../../stores/userSlice";
import { useMemo } from "react";
import Row from "./row";

export default function OrderTable({
  selected,
  descending,
}: {
  selected: number;
  descending: boolean;
}) {
  const dispatch = useAppDispatch();
  const bossPlans = useAppSelector((state) => state.user.bossPlans);
  const bossPlan = bossPlans[selected];

  const unsortedBossInfos = useMemo(
    () =>
      Object.entries(BOSS).flatMap(([type, boss]) =>
        Object.entries(boss.prices).map(([difficulty, price]) => ({
          type: type as BOSS_TYPE,
          name: boss.name,
          abbreviate: boss.abbreviate,
          icon: boss.icon,
          difficulty: difficulty as BOSS_DIFFICULTY,
          price,
        }))
      ),
    [BOSS]
  );
  const bossInfos = unsortedBossInfos.sort((a, b) =>
    descending ? b.price - a.price : a.price - b.price
  );

  return bossInfos.map(({ type, abbreviate, icon, difficulty }, i) => {
    const selectedPlanItem = bossPlan.boss.find(({ type: t }) => t == type);

    return (
      <Row
        key={"boss-" + i}
        icon={icon}
        label={abbreviate}
        difficulties={[difficulty]}
        selectedDifficulty={selectedPlanItem?.difficulty}
        maxMembers={getMaxMembers(
          type as BOSS_TYPE,
          selectedPlanItem?.difficulty
        )}
        members={selectedPlanItem?.members ?? 1}
        price={BOSS[type].prices[difficulty]}
        isDisabled={
          !selectedPlanItem && bossPlan.boss.length >= MAX_BOSS_SELECTABLE
        }
        onDifficultyChange={(newDifficulty) =>
          dispatch(
            (newDifficulty ? putBossItem : removeBossItem)({
              index: selected,
              type: type,
              difficulty: newDifficulty,
            })
          )
        }
        onMembersChage={(members) =>
          dispatch(
            putBossItem({
              index: selected,
              type: type,
              members,
            })
          )
        }
      />
    );
  });
}
