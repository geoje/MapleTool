import { Card, CardBody, Stack } from "@chakra-ui/react";
import { HelloAlert, UsageAlert } from "./alert/alert";
import { useAppSelector } from "../../stores/hooks";
import NameInput from "./register/nameInput";
import CharacterButtons from "./character/characterButtons";

export default function Home() {
  const userName = useAppSelector((state) => state.user.name);
  const history = useAppSelector((state) => state.user.history);

  return (
    <Stack width="100%" align="center">
      {userName ? <UsageAlert /> : <HelloAlert />}
      <Card>
        <CardBody>
          <NameInput />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CharacterButtons history={history} />
        </CardBody>
      </Card>
    </Stack>
  );
}
