import { Card, CardBody, Stack } from "@chakra-ui/react";
import NameInput from "./register/nameInput";
import CharacterButtons from "./character/characterButtons";

export default function Home() {
  return (
    <Stack width="100%" align="center">
      <Card>
        <CardBody>
          <NameInput />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CharacterButtons />
        </CardBody>
      </Card>
    </Stack>
  );
}
