import {
  Badge,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaDiamond } from "react-icons/fa6";
import BoardCard from "../../components/boardCard";
import { MAX_CRYSTAL_LEVEL } from "../../service/union/artifact/artifactConstants";
import { useState } from "react";

const CRYSTAL_URL_FORMAT = "/union-artifact/opened/{name}.webp";
const CRYSTAL_IMAGES_URL = [
  "orange-mushroom",
  "slime",
  "horny-mushroom",
  "stump",
  "golem",
  "balrog",
  "zaqqum",
  "pinkbean",
  "papulatus",
].map((v) => CRYSTAL_URL_FORMAT.replace("{name}", v));

export default function ResultGrid({
  levels,
  effectNames,
  remainPoint,
}: {
  levels: number[];
  effectNames: string[][];
  remainPoint: number;
}) {
  const [hoverEffect, setHoverEffect] = useState("");

  return (
    <BoardCard
      order={4}
      title="배치도"
      right={<Badge>남은 AP {remainPoint}</Badge>}
    >
      <SimpleGrid columns={3} gap={3}>
        {new Array(CRYSTAL_IMAGES_URL.length).fill(0).map((_, i) => (
          <Crystal
            key={"crystal-" + i}
            level={levels[i] ?? 0}
            effects={effectNames[i] ?? ["", "", ""]}
            imgUrl={CRYSTAL_IMAGES_URL[i]}
            hoverEffect={hoverEffect}
            setHoverEffect={setHoverEffect}
          />
        ))}
      </SimpleGrid>
    </BoardCard>
  );
}

function Crystal({
  level,
  effects,
  imgUrl,
  hoverEffect,
  setHoverEffect,
}: {
  level: number;
  effects: string[];
  imgUrl: string;
  hoverEffect: string;
  setHoverEffect: (value: string) => void;
}) {
  const levelIconSize = useBreakpointValue({ base: 12, md: 16 });
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const buttonBackgroundColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const buttonHoverBackgroundColor = useColorModeValue(
    "gray.300",
    "whiteAlpha.400"
  );

  return (
    <Stack
      p={[2, 2, 4]}
      borderRadius={8}
      bgColor={dark ? "gray.800" : "gray.50"}
      justify="end"
    >
      <Flex justify="center" pt={2} gap={1}>
        {new Array(level).fill(0).map((_, i) => (
          <Text
            key={"diamond-" + i}
            color={
              dark
                ? level < MAX_CRYSTAL_LEVEL
                  ? "blue.400"
                  : "purple.400"
                : level < MAX_CRYSTAL_LEVEL
                ? "blue.600"
                : "purple.600"
            }
          >
            <FaDiamond size={levelIconSize} />
          </Text>
        ))}
      </Flex>
      <Flex justify="center">
        <Image
          src={imgUrl}
          filter={
            level
              ? level < MAX_CRYSTAL_LEVEL
                ? undefined
                : "hue-rotate(50deg)"
              : "grayscale(1)"
          }
        />
      </Flex>
      {effects.map((effect, i) => (
        <Button
          key={"effect-" + i}
          size="xs"
          backgroundColor={
            effect &&
            (hoverEffect == effect
              ? buttonHoverBackgroundColor
              : buttonBackgroundColor)
          }
          _hover={{ backgroundColor: buttonHoverBackgroundColor }}
          onMouseEnter={() => setHoverEffect(effect)}
          onMouseLeave={() => setHoverEffect("")}
        >
          {effect}
        </Button>
      ))}
    </Stack>
  );
}
