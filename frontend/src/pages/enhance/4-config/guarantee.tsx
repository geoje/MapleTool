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
  BOUNDS,
  POTENTIAL_GRADE,
  POTENTIAL_INFOS,
} from "../../../constants/enhance/potential";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { MATERIAL_TYPE } from "../../../constants/enhance/material";
import { setGurantee } from "../../../stores/userSlice";

export default function Guarantee({
  materialType,
}: {
  materialType: MATERIAL_TYPE;
}) {
  const dispatch = useAppDispatch();
  const guarantee = useAppSelector((state) => state.user.guarantee);

  return (
    <>
      <Flex gap={1}>
        {Object.values(POTENTIAL_GRADE).map((grade, i) => {
          const currentValue =
            (guarantee[materialType] ? guarantee[materialType][grade] : 0) ?? 0;
          const bound = BOUNDS[materialType] ? BOUNDS[materialType][grade] : -1;

          if (bound == -1) return <></>;

          return (
            <Stack key={"grade-" + i} align="center">
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
                    dispatch(setGurantee({ type: materialType, grade, value }));
                  }}
                />
                <InputRightAddon>{bound}</InputRightAddon>
              </InputGroup>
            </Stack>
          );
        })}
      </Flex>
    </>
  );
}

function parseGuarantee(currentValue: number, newValue: string, bound: number) {
  if (!newValue) return 0;
  if (!newValue.match(/\d+/)) return currentValue;
  return Math.max(0, Math.min(bound, parseInt(newValue)));
}
