import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Flex, Stack } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Home from "./content/home/page";
import { LINKS, theme } from "./config";
import { store } from "./reducer/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Flex>
            <Sidebar />
            <Stack flex={1} gap={0}>
              <Header />
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
            </Stack>
          </Flex>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
