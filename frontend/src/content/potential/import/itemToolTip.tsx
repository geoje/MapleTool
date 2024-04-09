import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { TOOLTIP_COLORS } from "../../../service/character/itemEquipment/itemEquipmentConst";
import { CharacterItemEquipmentDetail } from "../../../dto/character/characterItemEquipment";
import {
  IMAGE_COLOR,
  KOR_NAME,
  TEXT_COLOR,
} from "../../../service/character/itemEquipment/potentialConst";
import PotentialService from "../../../service/character/itemEquipment/potential";
import StarfoceService from "../../../service/character/itemEquipment/startfoce";

export default function ItemToolTip({
  item,
}: {
  item: CharacterItemEquipmentDetail;
}) {
  const potentialIndex = PotentialService.getMaxPotentialIndex(item);

  return (
    <Box>
      <Stack align="stretch" p={2} gap={1}>
        <Starforce
          count={parseInt(item.starforce)}
          maxCount={StarfoceService.getMaxStarforceCount(item)}
        />
        <ItemName
          name={item.item_name}
          upgrade={item.scroll_upgrade}
          soulName={item.soul_name}
        />
        <PotentialGrade potential={KOR_NAME[potentialIndex]} />
      </Stack>

      <Divider variant="dashed" opacity={0.2} />
      <ImageAndReqLevel
        imgUrl={item.item_icon}
        potentialColor={IMAGE_COLOR[potentialIndex]}
        reqLevel={item.item_base_option.base_equipment_level}
      />

      <Divider variant="dashed" opacity={0.2} />
      <Stack align="stretch" p={2} gap={0}>
        <Options item={item} />
      </Stack>

      <Potential item={item} />
      <AddPotential item={item} />
      <Soul name={item.soul_name} option={item.soul_option} />
    </Box>
  );
}

function Starforce({ count, maxCount }: { count: number; maxCount: number }) {
  const stars = new Array(count).fill(true);
  stars.splice(count, 0, ...new Array(maxCount - count).fill(false));

  const starElement = (star: boolean) => (
    <Text color={star ? TOOLTIP_COLORS.STAR : "gray.500"} key={Math.random()}>
      <FaStar size={8} />
    </Text>
  );

  return (
    <>
      {maxCount > 0 && (
        <Flex justify="center" py={0.5} gap={2}>
          <Flex gap="1px">{stars.slice(0, 5).map(starElement)}</Flex>
          <Flex gap="1px">{stars.slice(5, 10).map(starElement)}</Flex>
          <Flex gap="1px">{stars.slice(10, 15).map(starElement)}</Flex>
        </Flex>
      )}
      {maxCount > 15 && (
        <Flex justify="center" py={0.5} gap={2}>
          <Flex gap="1px">{stars.slice(15, 20).map(starElement)}</Flex>
          <Flex gap="1px">{stars.slice(20, 25).map(starElement)}</Flex>
        </Flex>
      )}
    </>
  );
}
function ItemName({
  name,
  upgrade,
  soulName,
}: {
  name: string;
  upgrade: string;
  soulName?: string;
}) {
  return (
    <>
      {soulName && (
        <Heading
          size="xs"
          textAlign="center"
          color={TEXT_COLOR[TEXT_COLOR.length - 1]}
        >
          {soulName.substring(0, soulName.indexOf(" 소울"))}
        </Heading>
      )}
      <Heading size="xs" textAlign="center">
        {name}
        {upgrade == "0" ? "" : ` (+${upgrade})`}
      </Heading>
    </>
  );
}
function PotentialGrade({ potential }: { potential?: string }) {
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
  potentialColor?: string;
  reqLevel: number;
}) {
  return (
    <Flex width="100%" align="stretch" p={2}>
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
        name="STR :"
        total={item.item_total_option.str}
        base={item.item_base_option.str}
        add={item.item_add_option.str}
        etc={item.item_etc_option.str}
        star={item.item_starforce_option.str}
      />
      <Option
        name="DEX :"
        total={item.item_total_option.dex}
        base={item.item_base_option.dex}
        add={item.item_add_option.dex}
        etc={item.item_etc_option.dex}
        star={item.item_starforce_option.dex}
      />
      <Option
        name="INT :"
        total={item.item_total_option.int}
        base={item.item_base_option.int}
        add={item.item_add_option.int}
        etc={item.item_etc_option.int}
        star={item.item_starforce_option.int}
      />
      <Option
        name="LUK :"
        total={item.item_total_option.luk}
        base={item.item_base_option.luk}
        add={item.item_add_option.luk}
        etc={item.item_etc_option.luk}
        star={item.item_starforce_option.luk}
      />
      <Option
        name="최대 HP :"
        total={item.item_total_option.max_hp}
        base={item.item_base_option.max_hp}
        add={item.item_add_option.max_hp}
        etc={item.item_etc_option.max_hp}
        star={item.item_starforce_option.max_hp}
      />
      <Option
        name="최대 MP :"
        total={item.item_total_option.max_mp}
        base={item.item_base_option.max_mp}
        add={item.item_add_option.max_mp}
        etc={item.item_etc_option.max_mp}
        star={item.item_starforce_option.max_mp}
      />
      <Option
        name="최대 HP :"
        total={item.item_total_option.max_hp_rate}
        base={item.item_base_option.max_hp_rate}
        add={item.item_add_option.max_hp_rate}
        etc={item.item_etc_option.max_hp_rate}
        star={item.item_starforce_option.max_hp_rate}
        percent
      />
      <Option
        name="최대 MP :"
        total={item.item_total_option.max_mp_rate}
        base={item.item_base_option.max_mp_rate}
        add={item.item_add_option.max_mp_rate}
        etc={item.item_etc_option.max_mp_rate}
        star={item.item_starforce_option.max_mp_rate}
        percent
      />
      <Option
        name="공격력 :"
        total={item.item_total_option.attack_power}
        base={item.item_base_option.attack_power}
        add={item.item_add_option.attack_power}
        etc={item.item_etc_option.attack_power}
        star={item.item_starforce_option.attack_power}
      />
      <Option
        name="마력 :"
        total={item.item_total_option.magic_power}
        base={item.item_base_option.magic_power}
        add={item.item_add_option.magic_power}
        etc={item.item_etc_option.magic_power}
        star={item.item_starforce_option.magic_power}
      />
      <Option
        name="방어력 :"
        total={item.item_total_option.armor}
        base={item.item_base_option.armor}
        add={item.item_add_option.armor}
        etc={item.item_etc_option.armor}
        star={item.item_starforce_option.armor}
      />
      <Option
        name="이동속도 :"
        total={item.item_total_option.speed}
        base={item.item_base_option.speed}
        add={item.item_add_option.speed}
        etc={item.item_etc_option.speed}
        star={item.item_starforce_option.speed}
      />
      <Option
        name="점프력 :"
        total={item.item_total_option.jump}
        base={item.item_base_option.jump}
        add={item.item_add_option.jump}
        etc={item.item_etc_option.jump}
        star={item.item_starforce_option.jump}
      />
      <Option
        name="보스 몬스터 공격 시 데미지 "
        total={item.item_total_option.boss_damage}
        base={item.item_base_option.boss_damage}
        add={item.item_add_option.boss_damage}
        etc={item.item_etc_option.boss_damage}
        star={item.item_starforce_option.boss_damage}
        percent
      />
      <Option
        name="몬스터 방어율 무시  :"
        total={item.item_total_option.ignore_monster_armor}
        base={item.item_base_option.ignore_monster_armor}
        add={item.item_add_option.ignore_monster_armor}
        etc={item.item_etc_option.ignore_monster_armor}
        star={item.item_starforce_option.ignore_monster_armor}
        percent
      />
      <Option
        name="데미지  :"
        total={item.item_total_option.damage}
        base={item.item_base_option.damage}
        add={item.item_add_option.damage}
        etc={item.item_etc_option.damage}
        star={item.item_starforce_option.damage}
        percent
      />
      <Option
        name="올스텟  :"
        total={item.item_total_option.all_stat}
        base={item.item_base_option.all_stat}
        add={item.item_add_option.all_stat}
        etc={item.item_etc_option.all_stat}
        star={item.item_starforce_option.all_stat}
        percent
      />
      <OptionUpgrade
        upgrade={item.scroll_upgrade}
        upgradeable={item.scroll_upgradeable_count}
        resilience={item.scroll_resilience_count}
      />
      {item.golden_hammer_flag == "적용" && (
        <Text fontSize="xs">황금망치 제련 적용</Text>
      )}
      <OptionCuttable cuttable={item.cuttable_count} />
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

  const noNeedBrcsket =
    valBase == valTotal ||
    (valBase == 0 && valAdd == 0 && valEtc == 0 && valStar == 0);

  const valueElement = (value: number, color: string) =>
    value ? (
      <Text fontSize="xs" pl="2px" color={color}>
        {(value > 0 ? "+" : "") + value}
        {percent ? "%" : ""}
      </Text>
    ) : undefined;

  if (valTotal == 0) return <></>;
  return (
    <Flex>
      <Text
        fontSize="xs"
        color={noNeedBrcsket ? undefined : TOOLTIP_COLORS.TOTAL}
      >
        {name} +{valTotal}
        {percent ? "%" : ""}
      </Text>
      {noNeedBrcsket ? undefined : (
        <Text fontSize="xs" pl="2px">
          {"(" + valBase}
          {percent ? "%" : ""}
        </Text>
      )}
      {valueElement(valAdd, TOOLTIP_COLORS.ADD)}
      {valueElement(
        valEtc,
        valEtc > 0 ? TOOLTIP_COLORS.ETC_POSITIVE : TOOLTIP_COLORS.ETC_NEAGTIVE
      )}
      {valueElement(valStar, TOOLTIP_COLORS.STAR)}
      {noNeedBrcsket ? undefined : <Text fontSize="xs">{")"}</Text>}
    </Flex>
  );
}
function OptionUpgrade({
  upgrade,
  upgradeable,
  resilience,
}: {
  upgrade: string;
  upgradeable: string;
  resilience: string;
}) {
  if (upgrade == "0" && upgradeable == "0" && resilience == "0") return <></>;
  return (
    <Flex>
      <Text fontSize="xs">업그레이드 가능 횟수 : {upgradeable}</Text>
      <Text fontSize="xs" pl="2px" color={TOOLTIP_COLORS.STAR}>
        {"(복구 가능 횟수 : "}
        {resilience}
        {")"}
      </Text>
    </Flex>
  );
}
function OptionCuttable({ cuttable }: { cuttable: string }) {
  if (cuttable == "255") return <></>;
  return (
    <Flex>
      <Text fontSize="xs" color={TOOLTIP_COLORS.STAR}>
        가위 사용 가능 횟수 : {cuttable}회
      </Text>
    </Flex>
  );
}

function Potential({ item }: { item: CharacterItemEquipmentDetail }) {
  const gradeIndex = PotentialService.getMaxPotentialIndex(item);
  if (gradeIndex == -1) return <></>;

  return (
    <>
      <Divider variant="dashed" opacity={0.2} />
      <Stack p={2} gap={0}>
        <Flex align="center" gap={1}>
          <Image
            src={PotentialService.getPotentialIconUrl(gradeIndex)}
            style={{ imageRendering: "pixelated" }}
          />
          <Text fontSize="xs" color={TEXT_COLOR[gradeIndex]}>
            잠재옵션
          </Text>
        </Flex>
        {[
          item.potential_option_1,
          item.potential_option_2,
          item.potential_option_3,
        ].map((option, i) => (
          <Text key={"option-" + i} fontSize="xs">
            {option}
          </Text>
        ))}
      </Stack>
    </>
  );
}
function AddPotential({ item }: { item: CharacterItemEquipmentDetail }) {
  const potentialIndex = PotentialService.getMaxPotentialIndex(item);
  if (potentialIndex == -1) return <></>;

  return (
    <>
      <Divider variant="dashed" opacity={0.2} />
      <Stack p={2} gap={0}>
        <Flex align="center" gap={1}>
          <Image
            src={PotentialService.getPotentialIconUrl(potentialIndex)}
            style={{ imageRendering: "pixelated" }}
          />
          <Text fontSize="xs" color={TEXT_COLOR[potentialIndex]}>
            에디셔널 잠재옵션
          </Text>
        </Flex>
        {[
          item.additional_potential_option_1,
          item.additional_potential_option_2,
          item.additional_potential_option_3,
        ].map((option, i) => (
          <Text key={"option-" + i} fontSize="xs">
            {option}
          </Text>
        ))}
      </Stack>
    </>
  );
}
function Soul({ name, option }: { name?: string; option?: string }) {
  if (!name || !option) return <></>;

  return (
    <>
      <Divider variant="dashed" opacity={0.2} />
      <Stack p={2} gap={0}>
        <Text fontSize="xs" color={TOOLTIP_COLORS.SOUL}>
          {name}
        </Text>
        <Text fontSize="xs">{option}</Text>
      </Stack>
    </>
  );
}
