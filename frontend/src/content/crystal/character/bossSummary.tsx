import { Badge, Box, Flex, Image, Stack } from "@chakra-ui/react";
import { BOSS_DIFFICULTY, COLOR } from "../../../service/boss/bossConstants";

export default function BossSummary({
  src,
  difficulty,
  partyMembers,
}: {
  src: string;
  difficulty: BOSS_DIFFICULTY;
  partyMembers: number;
}) {
  return (
    <Stack gap={1}>
      <Flex justify="center">
        <Box borderColor={COLOR[difficulty]?.border} borderWidth={1}>
          <Image src={src} />
        </Box>
      </Flex>
      <Flex justify="center">
        <Badge
          color={COLOR[difficulty]?.text}
          bgColor={COLOR[difficulty]?.back}
          borderColor={COLOR[difficulty]?.border}
          borderWidth={1}
          fontSize="xx-small"
        >
          {difficulty.charAt(0)}
        </Badge>
        {partyMembers > 1 && <Badge>{partyMembers}</Badge>}
      </Flex>
    </Stack>
  );
}
