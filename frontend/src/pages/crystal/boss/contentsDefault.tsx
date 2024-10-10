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

export default function ContentsDefault() {
  const dispatch = useAppDispatch();
  const bossPlans = useAppSelector((state) => state.user.bossPlans);

  return Object.entries(BOSS).map(([type, boss], i) => (
    <Fragment key={"boss-" + i}>
      <Flex
        gap={2}
        pr={4}
        py={1}
        borderTopWidth={1}
        alignItems="center"
        opacity={
          !planItem.difficulty.has(type as BOSS_TYPE) &&
          planItem.difficulty.size >= BOSS_MAXIMUN_SELECTABLE
            ? 0.4
            : 1
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
              !planItem.difficulty.has(type as BOSS_TYPE) &&
              planItem.difficulty.size >= BOSS_MAXIMUN_SELECTABLE
            }
            isChecked={planItem.difficulty.get(type as BOSS_TYPE) == difficulty}
            onChange={(event) => {
              const newDifficulty = new Map(planItem.difficulty);
              if (event.target.checked)
                newDifficulty.set(
                  type as BOSS_TYPE,
                  difficulty as BOSS_DIFFICULTY
                );
              else newDifficulty.delete(type as BOSS_TYPE);

              setPlanItem((prevPlan) => ({
                ...prevPlan,
                difficulty: newDifficulty,
              }));
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
          value={planItem.partyMembers.get(type as BOSS_TYPE) ?? 1}
          onChange={(event) => {
            const value = parseInt(event.target.value);
            const newPartyMembers = new Map(planItem.partyMembers);

            if (value == 1) newPartyMembers.delete(type as BOSS_TYPE);
            else newPartyMembers.set(type as BOSS_TYPE, value);

            setPlanItem((prevPlan) => ({
              ...prevPlan,
              partyMembers: newPartyMembers,
            }));
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
        {planItem.difficulty.has(type as BOSS_TYPE) &&
          Math.round(
            getPrice(
              type as BOSS_TYPE,
              planItem.difficulty.get(type as BOSS_TYPE)!
            ) / (planItem.partyMembers.get(type as BOSS_TYPE) ?? 1)
          ).toLocaleString()}
      </Flex>
    </Fragment>
  ));
}
