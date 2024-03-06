import {
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaDiamond } from "react-icons/fa6";
import BoardCard from "../../components/boardCard";

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
}: {
  levels: number[];
  effectNames: string[][];
}) {
  return (
    <BoardCard order={4} title="배치도">
      <SimpleGrid columns={3} gap={3}>
        {new Array(CRYSTAL_IMAGES_URL.length).fill(0).map((_, i) => (
          <Crystal
            key={"crystal-" + i}
            level={levels[i] ?? 0}
            effects={effectNames[i] ?? ["", "", ""]}
            imgUrl={CRYSTAL_IMAGES_URL[i]}
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
}: {
  level: number;
  effects: string[];
  imgUrl: string;
}) {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <Stack
      px={4}
      py={6}
      borderRadius={8}
      bgColor={dark ? "gray.800" : "gray.50"}
    >
      <Flex justify="center" gap={1}>
        {new Array(level).fill(0).map((_, i) => (
          <Text key={"diamond-" + i} color={dark ? "gray.600" : "gray.500"}>
            <FaDiamond />
          </Text>
        ))}
      </Flex>
      <Flex justify="center">
        <Image src={imgUrl} />
      </Flex>
      {effects.map((effect, i) => (
        <Button key={"effect-" + i} size="xs">
          {effect}
        </Button>
      ))}
    </Stack>
  );
}
