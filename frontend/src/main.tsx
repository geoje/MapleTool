import React from "react";
import ReactDOM from "react-dom/client";
import {
  ChakraProvider,
  Grid,
  GridItem,
  ThemeComponentProps,
  extendTheme,
} from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Home from "./content/home";
import Artifact from "./content/artifact";

export const links = [
  {
    name: "potential",
    label: "잠재능력",
    image: "/link/cube.svg",
    content: <></>,
  },
  {
    name: "starforce",
    label: "스타포스",
    image: "/link/star.svg",
    content: <></>,
  },
  {
    name: "union-raid",
    label: "공격대",
    image: "/link/union-raid.svg",
    content: <></>,
  },
  {
    name: "union-artifact",
    label: "아티팩트",
    image: "/link/union-artifact.svg",
    content: <Artifact />,
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
    <Grid
      templateAreas={`"sidebar header"
            "sidebar content"`}
      gridTemplateColumns="256px 1fr"
    >
      <GridItem area="sidebar">
        <Sidebar />
      </GridItem>
      <GridItem area="header">
        <Header />
      </GridItem>
      <GridItem area="content">
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
      </GridItem>
    </Grid>
  );
}
