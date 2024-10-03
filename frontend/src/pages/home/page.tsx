import { Stack } from "@chakra-ui/react";
import { HelloAlert, UsageAlert } from "./alert/alert";
import RegistCard from "./character/registCard";
import { useAppSelector } from "../../stores/hooks";
import RegisterCard from "./register/registerCard";

export default function Home() {
  const userName = useAppSelector((state) => state.user.name);

  return (
    <Stack width="100%" align="center">
      {userName ? <UsageAlert /> : <HelloAlert />}
      <RegisterCard />
      <RegistCard />
    </Stack>
  );
}
