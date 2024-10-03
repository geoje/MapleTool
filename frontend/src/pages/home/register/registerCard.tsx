import { Card, CardBody } from "@chakra-ui/react";
import NameInput from "./nameInput";

export default function RegisterCard() {
  return (
    <Card>
      <CardBody>
        <NameInput />
      </CardBody>
    </Card>
  );
}
