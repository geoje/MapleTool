import React from "react";
import ReactDOM from "react-dom/client";
import {
  ChakraProvider,
  Flex,
  Stack,
  ThemeComponentProps,
  extendTheme,
} from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Home from "./content/home";
import { links } from "./constant";

const theme = extendTheme({
  fonts: {
    heading: `"Noto Sans KR"`,
    body: `"Noto Sans KR"`,
  },
  styles: {
    global: (props: ThemeComponentProps) => ({
      "html, body": {
        backgroundColor: props.colorMode == "dark" ? "gray.900" : "gray.50",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Flex>
          <Sidebar />
          <Stack flex={1} gap={0}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              {links.map((link) => (
                <Route
                  key={link.name}
                  path={"/" + link.name}
                  element={link.content}
                />
              ))}
            </Routes>
          </Stack>
        </Flex>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
