import {
  Box,
  Center,
  IconButton,
  Image,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";

import meso from "../../../assets/item/meso.png";

export default function SelectMaterial() {
  return (
    <Center>
      <SimpleGrid columns={5} gap={1}>
        <MaterialButton label="수상한 큐브" icon={meso} />
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
          aria-label={label}
          icon={<Image src={icon} />}
          onClick={onClick}
        />
      </Tooltip>
    </Box>
  );
}
