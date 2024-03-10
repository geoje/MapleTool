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
import {
  MAX_STARFORCE_COUNT,
  POTENTIAL_GRADE,
  POTENTIAL_GRADE_IMAGE_COLOR,
  TOOLTIP_COLORS,
} from "../../service/character/itemEquipment/itemEquipmentConstant";
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
          potential={
            POTENTIAL_GRADE[ItemEquipmentService.maxPotentialGradeIndex(item)]
          }
        />
      </Stack>
      <Divider variant="dashed" />
      <Box p={2}>
        <ImageAndReqLevel
          imgUrl={item.item_icon}
          potentialColor={
            POTENTIAL_GRADE_IMAGE_COLOR[
              ItemEquipmentService.maxPotentialGradeIndex(item)
            ]
          }
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
        borderColor={potentialColor}
        backgroundColor="gray.300"
      >
        <Image src={imgUrl} style={{ imageRendering: "pixelated" }} />
      </Flex>
      {potentialColor && (
        <Flex align="start">
          <Text
            textColor={potentialColor}
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
        total={item.item_total_option.str}
        base={item.item_base_option.str}
        add={item.item_add_option.str}
        etc={item.item_etc_option.str}
        star={item.item_starforce_option.str}
      />
      <Option
        name="DEX"
        total={item.item_total_option.dex}
        base={item.item_base_option.dex}
        add={item.item_add_option.dex}
        etc={item.item_etc_option.dex}
        star={item.item_starforce_option.dex}
      />
      <Option
        name="INT"
        total={item.item_total_option.int}
        base={item.item_base_option.int}
        add={item.item_add_option.int}
        etc={item.item_etc_option.int}
        star={item.item_starforce_option.int}
      />
      <Option
        name="LUK"
        total={item.item_total_option.luk}
        base={item.item_base_option.luk}
        add={item.item_add_option.luk}
        etc={item.item_etc_option.luk}
        star={item.item_starforce_option.luk}
      />
      <Option
        name="최대 HP"
        total={item.item_total_option.max_hp}
        base={item.item_base_option.max_hp}
        add={item.item_add_option.max_hp}
        etc={item.item_etc_option.max_hp}
        star={item.item_starforce_option.max_hp}
      />
      <Option
        name="최대 MP"
        total={item.item_total_option.max_mp}
        base={item.item_base_option.max_mp}
        add={item.item_add_option.max_mp}
        etc={item.item_etc_option.max_mp}
        star={item.item_starforce_option.max_mp}
      />
      <Option
        name="최대 HP"
        total={item.item_total_option.max_hp_rate}
        base={item.item_base_option.max_hp_rate}
        add={item.item_add_option.max_hp_rate}
        etc={item.item_etc_option.max_hp_rate}
        star={item.item_starforce_option.max_hp_rate}
        percent
      />
      <Option
        name="최대 MP"
        total={item.item_total_option.max_mp_rate}
        base={item.item_base_option.max_mp_rate}
        add={item.item_add_option.max_mp_rate}
        etc={item.item_etc_option.max_mp_rate}
        star={item.item_starforce_option.max_mp_rate}
        percent
      />
      <Option
        name="공격력"
        total={item.item_total_option.attack_power}
        base={item.item_base_option.attack_power}
        add={item.item_add_option.attack_power}
        etc={item.item_etc_option.attack_power}
        star={item.item_starforce_option.attack_power}
      />
      <Option
        name="마력"
        total={item.item_total_option.magic_power}
        base={item.item_base_option.magic_power}
        add={item.item_add_option.magic_power}
        etc={item.item_etc_option.magic_power}
        star={item.item_starforce_option.magic_power}
      />
      <Option
        name="방어력"
        total={item.item_total_option.armor}
        base={item.item_base_option.armor}
        add={item.item_add_option.armor}
        etc={item.item_etc_option.armor}
        star={item.item_starforce_option.armor}
      />
      <Option
        name="이동속도"
        total={item.item_total_option.speed}
        base={item.item_base_option.speed}
        add={item.item_add_option.speed}
        etc={item.item_etc_option.speed}
        star={item.item_starforce_option.speed}
      />
    </>
  );
}

function Option({
  name,
  total,
  base,
  add,
  etc,
  star,
  percent,
}: {
  name: string;
  total: string;
  base: string;
  add: string;
  etc: string;
  star: string;
  percent?: boolean;
}) {
  const valTotal = total ? parseInt(total) : 0;
  const valBase = base ? parseInt(base) : 0;
  const valAdd = add ? parseInt(add) : 0;
  const valEtc = etc ? parseInt(etc) : 0;
  const valStar = star ? parseInt(star) : 0;

  const valueElement = (value: number, color: string) =>
    value ? (
      <Text fontSize="xs" color={color}>
        {(value > 0 ? "+" : "") + value}
        {percent ? "%" : ""}
      </Text>
    ) : undefined;

  if (valTotal == 0) return <></>;
  return (
    <Flex>
      <Text
        fontSize="xs"
        color={
          valBase > 0 || valAdd > 0 || valEtc > 0 || valStar > 0
            ? TOOLTIP_COLORS.TOTAL
            : undefined
        }
      >
        {name} : +{valTotal}
        {percent ? "%" : ""}
      </Text>
      {valBase == valTotal || valBase == 0 ? undefined : (
        <Text fontSize="xs">
          {"(" + valBase}
          {percent ? "%" : ""}
        </Text>
      )}
      {valueElement(
        valAdd,
        valAdd > 0 ? TOOLTIP_COLORS.ADD_POSITIVE : TOOLTIP_COLORS.ADD_NEAGTIVE
      )}
      {valueElement(valEtc, TOOLTIP_COLORS.ETC)}
      {valueElement(valStar, TOOLTIP_COLORS.STAR)}
      {valBase == valTotal || valBase == 0 ? undefined : <Text>{")"}</Text>}
    </Flex>
  );
}
