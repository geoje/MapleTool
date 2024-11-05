import {
  Box,
  Center,
  IconButton,
  Image,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";
import {
  MATERIAL_INFOS,
  MATERIAL_TYPE,
} from "../../../constants/enhance/material";

export default function SelectMaterial({
  materialType,
  setMaterialType,
}: {
  materialType?: MATERIAL_TYPE;
  setMaterialType: (value?: MATERIAL_TYPE) => void;
}) {
  return (
    <Center>
      <SimpleGrid columns={5} gap={1}>
        {Object.entries(MATERIAL_INFOS).map(([type, info]) => {
          const convertedType = type as MATERIAL_TYPE;
          return (
            <MaterialButton
              key={type}
              label={info.name}
              icon={info.icon}
              selected={materialType == convertedType}
              onClick={() =>
                setMaterialType(
                  materialType == convertedType ? undefined : convertedType
                )
              }
            />
          );
        })}
      </SimpleGrid>
    </Center>
  );
}

function MaterialButton({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <Box position="relative">
      <Tooltip label={label} placement="top">
        <IconButton
          w="40px"
          aria-label={label}
          opacity={label.endsWith(")") ? 0.2 : undefined}
          colorScheme={selected ? "blue" : undefined}
          icon={<Image src={icon} maxW="none" />}
          onClick={onClick}
        />
      </Tooltip>
    </Box>
  );
}
