import { Button, Flex } from "@chakra-ui/react";
import Profile from "./profile";
import BossSummary from "./bossSummary";
import BossPlan from "../../../dto/user/crystal/bossPlan";
import CrystalService from "../../../service/user/crystal/crystal";

export default function CharacterButton({
  bossPlan,
  onClick,
}: {
  bossPlan: BossPlan;
  onClick?: () => void;
}) {
  return (
    <Button
      py={2}
      gap={2}
      h="fit-content"
      variant="ghost"
      justifyContent="space-between"
      leftIcon={<Profile src={bossPlan.image} name={bossPlan.name} />}
      onClick={onClick}
    >
      <Flex gap={1} wrap="wrap">
        {bossPlan.boss.map((boss, i) => (
          <BossSummary
            key={`boss-${bossPlan.name}-${i}`}
            src={CrystalService.getBossIcon(boss.type)}
            difficulty={boss.difficulty}
            partyMembers={boss.partyMembers}
          />
        ))}
      </Flex>
    </Button>
  );
}
