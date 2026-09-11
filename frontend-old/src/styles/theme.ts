import { extendTheme, ThemeComponentProps } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: `"Noto Sans KR"`,
    body: `"Noto Sans KR"`,
  },
  styles: {
    global: (props: ThemeComponentProps) => ({
      "html, body": {
        backgroundColor: props.colorMode == "dark" ? "gray.900" : "gray.50",
      },
      img: {
        imageRendering: "pixelated",
      },
    }),
  },
});
