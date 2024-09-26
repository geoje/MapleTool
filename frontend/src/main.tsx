import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Flex, Stack } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Home from "./pages/home/page";
import { LINKS, theme } from "./config";
import { store } from "./stores/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Flex>
            <Sidebar />
            <Stack flex={1} gap={0}>
              <Header />
              <Flex p={4} gap={4} wrap="wrap">
                <Routes>
                  <Route path="/" element={<Home />} />
                  {LINKS.map((link) => (
                    <Route
                      key={link.name}
                      path={"/" + link.name}
                      element={link.content}
                    />
                  ))}
                </Routes>
              </Flex>
            </Stack>
          </Flex>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
