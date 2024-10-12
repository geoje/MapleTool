import { Badge, Checkbox, Flex, Image, Select, Text } from "@chakra-ui/react";
import { BOSS_DIFFICULTY, COLOR } from "../../../constants/boss";

export default function Row({
  icon,
  label,
  difficulties,
  selectedDifficulty,
  maxMembers,
  members,
  price,
  isDisabled,
  onDifficultyChange,
  onMembersChage,
}: {
  icon: string;
  label: string;
  difficulties: BOSS_DIFFICULTY[];
  selectedDifficulty?: BOSS_DIFFICULTY;
  maxMembers: number;
  members: number;
  price?: number;
  isDisabled: boolean;
  onDifficultyChange: (difficulty?: BOSS_DIFFICULTY) => void;
  onMembersChage: (members: number) => void;
}) {
  return (
    <>
      <Flex
        pr={4}
        py={1}
        gap={2}
        borderTopWidth={1}
        alignItems="center"
        opacity={isDisabled ? 0.4 : undefined}
      >
        <Image src={icon} />
        <Text display={["none", "none", "block"]}>{label}</Text>
      </Flex>
      <Flex gap={2} py={1} borderTopWidth={1} wrap="wrap">
        {difficulties.map((difficulty, i) => (
          <Checkbox
            mr={2}
            key={`boss-difficulty-${i}`}
            isDisabled={isDisabled}
            isChecked={selectedDifficulty == difficulty}
            onChange={(event) =>
              onDifficultyChange(event.target.checked ? difficulty : undefined)
            }
          >
            <Badge
              color={COLOR[difficulty]?.text}
              bgColor={COLOR[difficulty]?.back}
              borderColor={COLOR[difficulty]?.border}
              borderWidth={1}
              fontSize="xx-small"
            >
              {difficulty}
            </Badge>
          </Checkbox>
        ))}
      </Flex>
      <Flex pr={4} py={1} borderTopWidth={1}>
        <Select
          size="xs"
          isDisabled={isDisabled}
          value={members}
          onChange={(event) => onMembersChage(parseInt(event.target.value))}
        >
          {new Array(maxMembers).fill(0).map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex
        pl={4}
        py={1}
        borderTopWidth={1}
        justify="end"
        alignItems="center"
        fontSize="xs"
      >
        {price}
      </Flex>
    </>
  );
}
