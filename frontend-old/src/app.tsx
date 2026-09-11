import { Flex, Show, Stack } from "@chakra-ui/react";
import Sidebar from "./components/layout/sidebar";
import Header from "./components/layout/header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/page";
import { LINKS } from "./constants/links";
import { useHandleErrorToast } from "./hooks/useHandleErrorToast";

export default function App() {
  useHandleErrorToast();

  return (
    <Flex>
      <Show above="md">
        <Sidebar />
      </Show>
      <Stack flex={1} gap={0}>
        <Header />
        <Flex px={[0, 0, 4]} py={4} gap={4} wrap="wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            {LINKS.map((link) => (
              <Route
                key={link.name}
                path={"/" + link.name}
                element={link.element}
              />
            ))}
          </Routes>
        </Flex>
      </Stack>
    </Flex>
  );
}
