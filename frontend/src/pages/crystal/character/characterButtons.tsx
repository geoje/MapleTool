import { Divider, Stack } from "@chakra-ui/react";
import NameInput from "./nameInput";
import CharacterButton from "./characterButton";
import { useAppSelector } from "../../../stores/hooks";

export default function CharacterButtons({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (value: number) => void;
}) {
  const bossPlans = useAppSelector((state) => state.user.bossPlans);

  return (
    <Stack divider={<Divider />}>
      <NameInput />
      {bossPlans.map((plan, i) => (
        <CharacterButton
          key={"character-" + i}
          bossPlan={plan}
          selected={selected == i}
          onClick={() => setSelected(selected == i ? -1 : i)}
        />
      ))}
    </Stack>
  );
}
