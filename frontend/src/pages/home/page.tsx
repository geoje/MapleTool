import { Stack } from "@chakra-ui/react";
import { HelloAlert, UsageAlert } from "./alert/alert";
import RegistCard from "./character/registCard";

export default function Home() {
  return (
    <Stack width="100%" align="center">
      {false ? <UsageAlert /> : <HelloAlert />}
      <RegistCard />
    </Stack>
  );
}
