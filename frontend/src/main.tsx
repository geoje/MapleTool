import React from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Home from "./pages/home/page";
import { ChakraProvider, Flex, Stack } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { theme } from "./styles/theme";
import { links } from "./constants/links";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./stores/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </PersistGate>
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
