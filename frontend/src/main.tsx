import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Flex, Stack } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import { theme } from "./styles/theme";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Home from "./pages/home/page";
import { links } from "./constants/links";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, persister } from "./apis/common/persistQueryClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
          >
            <App />
          </PersistQueryClientProvider>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

function App() {
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
