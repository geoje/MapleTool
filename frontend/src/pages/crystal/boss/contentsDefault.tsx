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
import { removeBossItem, setBossItem } from "../../../stores/userSlice";

export default function ContentsDefault({ selected }: { selected: number }) {
  const dispatch = useAppDispatch();
  const bossPlans = useAppSelector((state) => state.user.bossPlans);
  const bossPlan = bossPlans[selected];

  return Object.entries(BOSS).map(([type, boss], i) => (
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
        <Image src={boss.icon} />
        <Text display={["none", "none", "block"]}>{boss.name}</Text>
      </Flex>
      <Flex gap={2} py={1} borderTopWidth={1} wrap="wrap">
        {Object.entries(boss.prices).map(([difficulty], j) => (
          <Checkbox
            key={`boss-difficulty-${i}-${j}`}
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
                  setBossItem({
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
        ))}
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
              setBossItem({
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
          const boss = bossPlan.boss.find(
            (plan) => plan.type == (type as BOSS_TYPE)
          );
          if (!boss) return;

          return Math.round(
            getPrice(boss.type, boss.difficulty) / boss.partyMembers
          ).toLocaleString();
        })()}
      </Flex>
    </Fragment>
  ));
}
