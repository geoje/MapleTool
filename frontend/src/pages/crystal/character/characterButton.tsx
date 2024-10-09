import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import Profile from "./profile";
import BossSummary from "./bossSummary";
import PlanModal from "./modal/planModal";
import BossPlan from "../../../types/user/bossPlan";
import { getBossIcon } from "../../../utils/boss";

export default function CharacterButton({
  bossPlan,
  bossPlanIndex,
}: {
  bossPlan: BossPlan;
  bossPlanIndex: number;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        py={2}
        gap={2}
        h="fit-content"
        variant="ghost"
        justifyContent="space-between"
        leftIcon={<Profile src={bossPlan.image} name={bossPlan.name} />}
        onClick={onOpen}
      >
        <Flex gap={1} wrap="wrap">
          {bossPlan.boss.map((boss, i) => (
            <BossSummary
              key={`boss-${bossPlan.name}-${i}`}
              src={getBossIcon(boss.type)}
              difficulty={boss.difficulty}
              partyMembers={boss.partyMembers}
            />
          ))}
        </Flex>
      </Button>
      <PlanModal
        isOpen={isOpen}
        onClose={onClose}
        bossPlanIndex={bossPlanIndex}
      />
    </>
  );
}
