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
import Construct from "./content/construct";
import Artifact from "./content/artifact";

export const links = [
  {
    name: "potential",
    label: "잠재능력",
    image: "/link/cube.svg",
    content: <Construct />,
    building: true,
  },
  {
    name: "starforce",
    label: "스타포스",
    image: "/link/star.svg",
    content: <Construct />,
    building: true,
  },
  {
    name: "union-raid",
    label: "공격대",
    image: "/link/union-raid.svg",
    content: <Construct />,
    building: true,
  },
  {
    name: "union-artifact",
    label: "아티팩트",
    image: "/link/union-artifact.svg",
    content: <Artifact />,
    building: true,
  },
];

const theme = extendTheme({
  fonts: {
    heading: `"Noto Sans KR"`,
    body: `"Noto Sans KR"`,
  },
  styles: {
    global: (props: ThemeComponentProps) => ({
      "html, body": {
        backgroundColor: props.colorMode ? "gray.50" : "gray.800",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

function App() {
  return (
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
  );
}
