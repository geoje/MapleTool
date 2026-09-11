import { Box, Image } from "@chakra-ui/react";
import characterBlank from "../../assets/union/raid/character-blank.png";

export default function CharacterImage({
  src,
  adjust,
  boxSizePx,
}: {
  src?: string;
  adjust?: boolean;
  boxSizePx?: number;
}) {
  const size = (boxSizePx ?? 96) + "px";
  const ratio = boxSizePx ? boxSizePx / 96 : 1;
  const adjustRatio = (boxSizePx ?? 96) / 180;

  return (
    <Box w={size} h={size}>
      <Image
        src={src}
        maxW="none"
        fallback={<BlankCharacterImage />}
        pointerEvents="none"
        position="relative"
        top="50%"
        left="50%"
        transform={`
          translate(-50%, -50%)
          translate(
            ${adjust ? 4 * adjustRatio : 0}px,
            ${adjust ? -22 * adjustRatio : 0}px
          )
          scale(${ratio});
        `}
      />
    </Box>
  );
}

function BlankCharacterImage() {
  return (
    <Image
      src={characterBlank}
      filter="opacity(0.2) drop-shadow(0 0 0 #000000);"
    />
  );
}
