import { Stack } from "@chakra-ui/react";
import { HelloAlert, UsageAlert } from "./alert/alert";
import HistoryButtons from "./history/historyButtons";
import RegistCard from "./character/registCard";

export default function Home() {
  return (
    <Stack width="100%" align="center">
      {false ? <UsageAlert /> : <HelloAlert />}
      <HistoryButtons />
      <RegistCard />
    </Stack>
  );
}
