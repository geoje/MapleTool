import {
  Box,
  Center,
  IconButton,
  Image,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";
import { MATERIAL_INFOS } from "../../../constants/enhance/material";

export default function SelectMaterial() {
  return (
    <Center>
      <SimpleGrid columns={5} gap={1}>
        {Object.entries(MATERIAL_INFOS).map(([type, info]) => (
          <MaterialButton key={type} label={info.name} icon={info.icon} />
        ))}
      </SimpleGrid>
    </Center>
  );
}

function MaterialButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: string;
  onClick?: () => void;
}) {
  return (
    <Box position="relative">
      <Tooltip label={label} placement="top">
        <IconButton
          w={64}
          aria-label={label}
          icon={<Image src={icon} />}
          onClick={onClick}
        />
      </Tooltip>
    </Box>
  );
}
