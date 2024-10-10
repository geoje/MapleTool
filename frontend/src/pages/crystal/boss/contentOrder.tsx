import {
  Badge,
  Center,
  Checkbox,
  Flex,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import {
  BOSS,
  BOSS_DIFFICULTY,
  BOSS_MAXIMUN_SELECTABLE,
  BOSS_TYPE,
  COLOR,
} from "../../../constants/boss";
import { Fragment } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getPrice } from "../../../utils/boss";
import { removeBossItem, putBossItem } from "../../../stores/userSlice";

export default function ContentsOrder({
  selected,
  descending,
}: {
  selected: number;
  descending: boolean;
}) {
  const dispatch = useAppDispatch();
  const bossPlans = useAppSelector((state) => state.user.bossPlans);
  const bossPlan = bossPlans[selected];

  const bossInfos = Object.entries(BOSS)
    .flatMap(([type, boss]) =>
      Object.entries(boss.prices).map(([difficulty, price]) => ({
        type,
        name: boss.name,
        abbreviate: boss.abbreviate,
        icon: boss.icon,
        difficulty,
        price,
      }))
    )
    .sort((a, b) => (descending ? b.price - a.price : a.price - b.price));

  return bossInfos.map(({ type, abbreviate, icon, difficulty }, i) => (
    <Fragment key={"boss-" + i}>
      <Flex
        gap={2}
        pr={4}
        py={1}
        borderTopWidth={1}
        alignItems="center"
        opacity={
          bossPlan.boss.length < BOSS_MAXIMUN_SELECTABLE ||
          bossPlan.boss.find((plan) => plan.type == (type as BOSS_TYPE))
            ? 1
            : 0.4
        }
      >
        <Image src={icon} />
        <Text display={["none", "none", "block"]}>{abbreviate}</Text>
      </Flex>
      <Flex gap={2} py={1} borderTopWidth={1} wrap="wrap">
        <Checkbox
          key={`boss-difficulty-${i}`}
          mr={2}
          isDisabled={
            !(
              bossPlan.boss.length < BOSS_MAXIMUN_SELECTABLE ||
              bossPlan.boss.find((plan) => plan.type == (type as BOSS_TYPE))
            )
          }
          isChecked={
            bossPlan.boss.findIndex(
              (plan) =>
                plan.type == (type as BOSS_TYPE) &&
                plan.difficulty == difficulty
            ) != -1
          }
          onChange={(event) => {
            if (event.target.checked) {
              dispatch(
                putBossItem({
                  index: selected,
                  type: type as BOSS_TYPE,
                  difficulty: difficulty as BOSS_DIFFICULTY,
                })
              );
              return;
            }

            dispatch(
              removeBossItem({
                index: selected,
                type: type as BOSS_TYPE,
                difficulty: difficulty as BOSS_DIFFICULTY,
              })
            );
          }}
        >
          <Center>
            <Badge
              color={COLOR[difficulty as BOSS_DIFFICULTY]?.text}
              bgColor={COLOR[difficulty as BOSS_DIFFICULTY]?.back}
              borderColor={COLOR[difficulty as BOSS_DIFFICULTY]?.border}
              borderWidth={1}
              fontSize="xx-small"
            >
              {difficulty}
            </Badge>
          </Center>
        </Checkbox>
      </Flex>
      <Center py={1} borderTopWidth={1}>
        <Select
          size="xs"
          value={
            bossPlan.boss.find((plan) => plan.type == (type as BOSS_TYPE))
              ?.partyMembers ?? 1
          }
          onChange={(event) => {
            const partyMembers = parseInt(event.target.value);
            dispatch(
              putBossItem({
                index: selected,
                type: type as BOSS_TYPE,
                partyMembers,
              })
            );
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </Select>
      </Center>
      <Flex
        gap={2}
        pl={4}
        py={1}
        borderTopWidth={1}
        justify="end"
        alignItems="center"
        fontSize="xs"
      >
        {(() => {
          return Math.round(
            getPrice(type as BOSS_TYPE, difficulty as BOSS_DIFFICULTY) /
              (bossPlan.boss.find((plan) => plan.type == (type as BOSS_TYPE))
                ?.partyMembers ?? 1)
          ).toLocaleString();
        })()}
      </Flex>
    </Fragment>
  ));
}
