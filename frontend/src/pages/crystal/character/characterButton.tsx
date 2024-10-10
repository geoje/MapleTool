import { Button, Flex } from "@chakra-ui/react";
import Profile from "./profile";
import BossSummary from "./bossSummary";
import BossPlan from "../../../types/user/bossPlan";
import { getBossIcon } from "../../../utils/boss";
import { useBasicQuery } from "../../../stores/characterApi";

export default function CharacterButton({
  bossPlan,
  selected,
  onClick,
}: {
  bossPlan: BossPlan;
  selected: boolean;
  onClick: () => void;
}) {
  const { data, isFetching } = useBasicQuery(bossPlan.name, {
    skip: !bossPlan.name,
  });

  return (
    <>
      <Button
        py={2}
        gap={2}
        h="fit-content"
        variant={selected ? undefined : "ghost"}
        justifyContent="space-between"
        leftIcon={
          <Profile
            src={data?.character_image}
            name={bossPlan.name}
            loading={isFetching}
          />
        }
        onClick={onClick}
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
    </>
  );
}
