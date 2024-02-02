import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Grid, GridItem, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Home from "./content/home";
import Artifact from "./content/artifact";

export const links = [
  { name: "potential", label: "잠재능력", content: <></> },
  { name: "starforce", label: "스타포스", content: <></> },
  { name: "raid", label: "공격대", content: <></> },
  { name: "artifact", label: "아티팩트", content: <Artifact /> },
];

const theme = extendTheme({
  fonts: {
    heading: `"Noto Sans KR"`,
    body: `"Noto Sans KR"`,
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
      gridTemplateRows="64px 1fr"
      gridTemplateColumns="256px 1fr"
    >
      <GridItem p={2} area="sidebar">
        <Sidebar />
      </GridItem>
      <GridItem p={2} area="header">
        <Header />
      </GridItem>
      <GridItem p={2} area="content" bgColor="gray.50">
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
