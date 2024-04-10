import {
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import {
  ADDITIONAL_GUARANTEE_BOUND,
  GUARANTEE_BOUND,
  KOR_NAME,
} from "../../service/character/itemEquipment/potentialConst";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import { setUserGuarantee } from "../../reducer/userSlice";
import PotentialService from "../../service/character/itemEquipment/potential";

export default function Guarantee() {
  const dispatch = useAppDispatch();
  const guarantee = useAppSelector((state) => state.user.guarantee);

  return (
    <Grid
      templateColumns={["60px repeat(3, 1fr)", null, "60px repeat(3, 100px)"]}
      gap={2}
    >
      <GridItem></GridItem>
      {KOR_NAME.slice(1).map((name, i) => (
        <HeaderGridItem key={"grade-" + i} text={name} gradeIndex={i + 1} />
      ))}
      <HeaderGridItem text="잠재능력" />
      {GUARANTEE_BOUND.map((bound, i) => (
        <GridItem key={"bound-" + i}>
          <InputGroup size="xs">
            <Input
              value={guarantee[0][i]}
              onChange={(e) => {
                const value = parseValue(
                  guarantee[0][i],
                  e.target.value,
                  bound
                );
                dispatch(setUserGuarantee({ value, i: 0, j: i }));
              }}
            />
            <InputRightAddon>{bound}</InputRightAddon>
          </InputGroup>
        </GridItem>
      ))}
      <HeaderGridItem text="에디셔널" />
      {ADDITIONAL_GUARANTEE_BOUND.map((bound, i) => (
        <GridItem key={"add-bound-" + i}>
          <InputGroup size="xs">
            <Input
              value={guarantee[1][i]}
              onChange={(e) => {
                const value = parseValue(
                  guarantee[1][i],
                  e.target.value,
                  bound
                );
                dispatch(setUserGuarantee({ value, i: 1, j: i }));
              }}
            />
            <InputRightAddon>{bound}</InputRightAddon>
          </InputGroup>
        </GridItem>
      ))}
    </Grid>
  );
}

function HeaderGridItem({
  text,
  gradeIndex,
}: {
  text: string;
  gradeIndex?: number;
}) {
  return (
    <GridItem
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1}
      fontSize={12}
      fontWeight="bold"
    >
      {gradeIndex && (
        <Image
          src={PotentialService.getPotentialIconUrl(gradeIndex)}
          style={{ imageRendering: "pixelated" }}
        />
      )}
      {text}
    </GridItem>
  );
}

function parseValue(currentValue: number, newValue: string, bound: number) {
  if (!newValue) return 0;
  if (!newValue.match(/\d+/)) return currentValue;
  return Math.max(0, Math.min(bound, parseInt(newValue)));
}
