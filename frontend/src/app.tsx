import { Flex, Stack } from "@chakra-ui/react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/page";
import { links } from "./constants/links";

export default function App() {
  return (
    <Flex>
      <Sidebar />
      <Stack flex={1} gap={0}>
        <Header />
        <Flex p={4} gap={4} wrap="wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            {links.map((link) => (
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
