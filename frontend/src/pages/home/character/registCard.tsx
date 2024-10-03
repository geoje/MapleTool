import { Card, CardBody } from "@chakra-ui/react";
import CharacterButtons from "./characterButtons";

export default function RegistCard() {
  return (
    <Card>
      <CardBody>
        <CharacterButtons />
      </CardBody>
    </Card>
  );
}
