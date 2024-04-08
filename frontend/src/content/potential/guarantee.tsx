import {
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Table,
  Tr,
} from "@chakra-ui/react";
import { KOR_NAME } from "../../service/character/itemEquipment/potentialConst";

export default function Guarantee() {
  return (
    <Grid
      templateColumns={["60px repeat(4, 1fr)", null, "60px repeat(4, 80px)"]}
      gap={1}
    >
      <GridItem></GridItem>
      {KOR_NAME.map((name, i) => (
        <HeaderGridItem key={"grade-" + i} text={name} />
      ))}
      <HeaderGridItem text="잠재능력" />
      <GridItem>
        <InputGroup size="xs">
          <Input defaultValue={0} />
          <InputRightAddon>10</InputRightAddon>
        </InputGroup>
      </GridItem>
      <GridItem>
        <InputGroup size="xs">
          <Input defaultValue={0} />
          <InputRightAddon>10</InputRightAddon>
        </InputGroup>
      </GridItem>
      <GridItem>
        <InputGroup size="xs">
          <Input defaultValue={0} />
          <InputRightAddon>10</InputRightAddon>
        </InputGroup>
      </GridItem>
      <GridItem>
        <InputGroup size="xs">
          <Input defaultValue={0} />
          <InputRightAddon>10</InputRightAddon>
        </InputGroup>
      </GridItem>
    </Grid>
  );
}

function HeaderGridItem({ text }: { text: string }) {
  return (
    <GridItem fontSize={12} textAlign="center" fontWeight="bold">
      {text}
    </GridItem>
  );
}
