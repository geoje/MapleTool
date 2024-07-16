import { Button, Flex, Hide, Show } from "@chakra-ui/react";
import Profile from "./profile";
import BossSummary from "./bossSummary";
import { CharacterBoss } from "../page";

const TEMP_CHARACTER_IMAGE_URL = "/union-raid/character-blank.png";

export default function CharacterButton({
  characterBoss,
}: {
  characterBoss: CharacterBoss;
}) {
  return (
    <Button
      py={2}
      gap={2}
      h="fit-content"
      variant="ghost"
      justifyContent="space-between"
      leftIcon={
        <Profile src={TEMP_CHARACTER_IMAGE_URL} name={characterBoss.name} />
      }
    >
      <Flex gap={1} wrap="wrap">
        {characterBoss.boss.map((boss, i) => (
          <BossSummary
            key={`boss-${characterBoss.name}-${i}`}
            src={boss.icon}
            difficulty={boss.difficulty}
            partyMembers={boss.partMembers}
          />
        ))}
      </Flex>
    </Button>
  );
}
