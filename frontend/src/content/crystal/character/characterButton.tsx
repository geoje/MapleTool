import { Button, Flex, Hide, Show } from "@chakra-ui/react";
import Profile from "./profile";
import BossSummary from "./bossSummary";
import BossPlan from "../../../dto/user/crystal/bossPlan";
import CrystalService from "../../../service/user/crystal/crystal";

const TEMP_CHARACTER_IMAGE_URL = "/union-raid/character-blank.png";

export default function CharacterButton({ bossPlan }: { bossPlan: BossPlan }) {
  return (
    <Button
      py={2}
      gap={2}
      h="fit-content"
      variant="ghost"
      justifyContent="space-between"
      leftIcon={<Profile src={TEMP_CHARACTER_IMAGE_URL} name={bossPlan.name} />}
    >
      <Flex gap={1} wrap="wrap">
        {bossPlan.boss.map((boss, i) => (
          <BossSummary
            key={`boss-${bossPlan.name}-${i}`}
            src={CrystalService.getBossIcon(boss.type)}
            difficulty={boss.difficulty}
            partyMembers={boss.partMembers}
          />
        ))}
      </Flex>
    </Button>
  );
}
