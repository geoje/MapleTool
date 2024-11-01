import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  POTENTIAL_CRITERIA,
  POTENTIAL_GRADE,
  POTENTIAL_INFOS,
} from "../../../constants/enhance/potential";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { MATERIAL_TYPE } from "../../../constants/enhance/material";
import { setGuarantee } from "../../../stores/userSlice";
import React from "react";

export default function Guarantee({
  materialType,
}: {
  materialType: MATERIAL_TYPE;
}) {
  const dispatch = useAppDispatch();
  const guarantees = useAppSelector((state) => state.user.guarantees);

  return (
    <Flex justify={{ base: "center", md: "space-between" }} gap={0.5}>
      {Object.values(POTENTIAL_GRADE).map((grade, i) => {
        const currentValue =
          (guarantees[materialType] ? guarantees[materialType][grade] : 0) ?? 0;
        const bound = POTENTIAL_CRITERIA[materialType]
          ? POTENTIAL_CRITERIA[materialType][grade].bound
          : 0;

        if (bound <= 0) return <React.Fragment key={"guarantee-" + i} />;

        return (
          <Stack key={"guarantee-" + i} align="center">
            <Flex align="center" gap={1}>
              <Image src={POTENTIAL_INFOS[grade].icon} />
              <Text fontSize="xs" fontWeight="bold">
                {POTENTIAL_INFOS[grade].name}
              </Text>
            </Flex>
            <InputGroup size="xs">
              <Input
                w={bound >= 100 ? 10 : 8}
                value={currentValue}
                onChange={(e) => {
                  const value = parseGuarantee(
                    currentValue,
                    e.target.value,
                    bound
                  );
                  dispatch(setGuarantee({ type: materialType, grade, value }));
                }}
              />
              <InputRightAddon>{bound}</InputRightAddon>
            </InputGroup>
          </Stack>
        );
      })}
    </Flex>
  );
}

function parseGuarantee(currentValue: number, newValue: string, bound: number) {
  if (!newValue) return 0;
  if (!newValue.match(/\d+/)) return currentValue;
  return Math.max(0, Math.min(bound, parseInt(newValue)));
}
