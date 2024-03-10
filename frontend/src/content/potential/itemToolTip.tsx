import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { MAX_STARFORCE_COUNT } from "../../service/character/itemEquipment/itemEquipmentConstant";
import { CharacterItemEquipmentDetail } from "../../domain/character/characterItemEquipment";
import ItemEquipmentService from "../../service/character/itemEquipment/itemEquipment";

export default function ItemToolTip({
  item,
}: {
  item: CharacterItemEquipmentDetail;
}) {
  return (
    <Box>
      <Stack align="stretch" p={2} gap={1}>
        <Starforce count={parseInt(item.starforce)} />
        <ItemName name={item.item_name} upgrade={item.scroll_upgrade} />
        <PotentialGrade
          potential={ItemEquipmentService.maxPotentialGrade(item)}
        />
      </Stack>
      <Divider variant="dashed" />
      <Box p={2}>
        <ImageAndReqLevel
          imgUrl={item.item_icon}
          potentialColor={ItemEquipmentService.maxPotentialGradeColor(item)}
          reqLevel={item.item_base_option.base_equipment_level}
        />
      </Box>
      <Divider variant="dashed" />
      <Stack align="stretch" p={2} gap={1}>
        <Options item={item} />
      </Stack>
    </Box>
  );
}

function Starforce({ count }: { count: number }) {
  const stars = new Array(count).fill(true);
  stars.splice(count, 0, ...new Array(MAX_STARFORCE_COUNT - count).fill(false));

  const starElement = (star: boolean) =>
    star ? (
      <Text color="yellow.400" key={Math.random()}>
        <FaStar size={8} />
      </Text>
    ) : (
      <FaRegStar size={8} key={Math.random()} />
    );

  return (
    <>
      <Flex justify="center" px={2} gap={1}>
        <Flex gap="1px">{stars.slice(0, 5).map(starElement)}</Flex>
        <Flex gap="1px">{stars.slice(5, 10).map(starElement)}</Flex>
        <Flex gap="1px">{stars.slice(10, 15).map(starElement)}</Flex>
      </Flex>
      <Flex justify="center" gap={1}>
        <Flex gap="1px">{stars.slice(15, 20).map(starElement)}</Flex>
        <Flex gap="1px">{stars.slice(20, 25).map(starElement)}</Flex>
      </Flex>
    </>
  );
}

function ItemName({ name, upgrade }: { name: string; upgrade: string }) {
  return (
    <Heading size="xs" textAlign="center">
      {name}
      {upgrade == "0" ? "" : ` (+${upgrade})`}
    </Heading>
  );
}

function PotentialGrade({ potential }: { potential: string }) {
  return potential ? (
    <Text fontSize="xs" textAlign="center">
      ({potential} 아이템)
    </Text>
  ) : (
    <></>
  );
}

function ImageAndReqLevel({
  imgUrl,
  potentialColor,
  reqLevel,
}: {
  imgUrl: string;
  potentialColor: string;
  reqLevel: number;
}) {
  return (
    <Flex width="100%" align="stretch">
      <Flex
        w="42px"
        h="42px"
        justify="center"
        align="center"
        borderRadius={2}
        borderWidth={2}
        borderColor={potentialColor + ".400"}
      >
        <Image src={imgUrl} style={{ imageRendering: "pixelated" }} />
      </Flex>
      {potentialColor && (
        <Flex align="start">
          <Text
            textColor={potentialColor + ".400"}
            transform="rotate(270deg) translateY(-1px);"
          >
            <IoBookmarkSharp size={8} />
          </Text>
        </Flex>
      )}
      <Flex align="center">
        <Text pl={2} fontSize={8} color="#fad501">
          REQ LEV : {reqLevel}
        </Text>
      </Flex>
    </Flex>
  );
}

function Options({ item }: { item: CharacterItemEquipmentDetail }) {
  return (
    <>
      <Text fontSize="xs">장비분류 : {item.item_equipment_part}</Text>
      <Option
        name="STR"
        base={item.item_base_option.str}
        add={item.item_add_option.str}
        etc={item.item_etc_option.str}
        star={item.item_starforce_option.str}
      />
      <Option
        name="DEX"
        base={item.item_base_option.dex}
        add={item.item_add_option.dex}
        etc={item.item_etc_option.dex}
        star={item.item_starforce_option.dex}
      />
      <Option
        name="INT"
        base={item.item_base_option.int}
        add={item.item_add_option.int}
        etc={item.item_etc_option.int}
        star={item.item_starforce_option.int}
      />
      <Option
        name="LUK"
        base={item.item_base_option.luk}
        add={item.item_add_option.luk}
        etc={item.item_etc_option.luk}
        star={item.item_starforce_option.luk}
      />
    </>
  );
}

function Option({
  name,
  base,
  add,
  etc,
  star,
}: {
  name: string;
  base: string;
  add: string;
  etc: string;
  star: string;
}) {
  const valBase = base ? parseInt(base) : 0;
  const valAdd = add ? parseInt(add) : 0;
  const valEtc = etc ? parseInt(etc) : 0;
  const valStar = star ? parseInt(star) : 0;
  const valTotal = valBase + valAdd + valEtc + valStar;

  const valueElement = (value: number, color: string) =>
    value ? (
      <Text fontSize="xs" color={color}>
        {(value > 0 ? "+" : "-") + value}
      </Text>
    ) : undefined;

  if (valTotal == 0) return <></>;
  return (
    <Flex>
      <Text fontSize="xs" color={valBase == valTotal ? undefined : "#63f3f3"}>
        {name} : +{valTotal}
      </Text>
      {valBase == valTotal ? undefined : (
        <Text fontSize="xs">{"(" + valBase}</Text>
      )}
      {valueElement(valAdd, "#d4ff00")}
      {valueElement(valEtc, "#a8a8fb")}
      {valueElement(valStar, "#fbc901")}
      {valBase == valTotal ? undefined : <Text>{")"}</Text>}
    </Flex>
  );
}
