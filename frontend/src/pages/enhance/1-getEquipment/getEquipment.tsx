import { SET_INFOS, SET_TYPE } from "../../../constants/enhance/set";
import {
  Divider,
  Flex,
  IconButton,
  Image,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import CharacterEquipTable from "./characterEquipTable";
import PreparedEquipTable from "./preparedEquipTable";

export default function GetEquipment({
  preset,
  setPreset,
}: {
  preset: number | SET_TYPE;
  setPreset: (value: SET_TYPE) => void;
}) {
  return (
    <Stack align="center" gap={1} divider={<Divider />}>
      <Flex w="100%" gap={1} wrap="wrap">
        {Object.entries(SET_INFOS).map(([type, info]) => (
          <Tooltip key={type} label={info.name} placement="top">
            <IconButton
              aria-label={info.name}
              key={info.name}
              flex={1}
              size="xs"
              icon={<Image src={info.icon} height="var(--chakra-sizes-5)" />}
              colorScheme={preset == (type as SET_TYPE) ? "blue" : undefined}
              onClick={() => setPreset(type as SET_TYPE)}
            />
          </Tooltip>
        ))}
      </Flex>

      {typeof preset == "number" ? (
        <CharacterEquipTable preset={preset} />
      ) : (
        <PreparedEquipTable preset={preset} />
      )}
    </Stack>
  );
}
