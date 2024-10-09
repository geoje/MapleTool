import {
  Badge,
  Center,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { FiCopy, FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../../stores/hooks";
import NameEditable from "./nameEditable";
import {
  BOSS,
  BOSS_DIFFICULTY,
  BOSS_MAXIMUN_SELECTABLE,
  BOSS_TYPE,
  COLOR,
} from "../../../../constants/boss";
import BossPlan from "../../../../types/user/bossPlan";
import {
  addBossPlan,
  deleteBossPlan,
  insertBossPlan,
  setBossPlan,
} from "../../../../stores/userSlice";
import { getPrice } from "../../../../utils/boss";
import characterBlank from "../../../../assets/union/raid/character-blank.png";

const DEFAULT_CURRENT_PLAN = {
  name: "",
  image: "",
  order: "",
  difficulty: new Map<BOSS_TYPE, BOSS_DIFFICULTY>(),
  partyMembers: new Map<BOSS_TYPE, number>(),
};

export default function PlanModal({
  isOpen,
  onClose,
  bossPlanIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  bossPlanIndex: number;
}) {
  const dispatch = useAppDispatch();
  const bossPlan = useAppSelector((state) => state.user.bossPlan);

  const [currentPlan, setCurrentPlan] = useState(DEFAULT_CURRENT_PLAN);

  const saveData = () => {
    const plan: BossPlan = {
      name: currentPlan.name,
      image: currentPlan.image,
      order: currentPlan.order,
      boss: [],
    };
    Object.entries(BOSS).forEach(([type]) => {
      if (currentPlan.difficulty.has(type as BOSS_TYPE)) {
        plan.boss.push({
          type: type as BOSS_TYPE,
          difficulty: currentPlan.difficulty.get(type as BOSS_TYPE)!,
          partyMembers: currentPlan.partyMembers.get(type as BOSS_TYPE) ?? 1,
        });
      }
    });

    if (bossPlanIndex < 0 || bossPlanIndex >= bossPlan.length) {
      if (!plan.name.length && !plan.boss.length) return plan;

      dispatch(addBossPlan(plan));
      setCurrentPlan(DEFAULT_CURRENT_PLAN);
    } else dispatch(setBossPlan({ index: bossPlanIndex, value: plan }));

    return plan;
  };
  const copyData = () => {
    const plan: BossPlan = saveData();

    if (bossPlanIndex < 0 || bossPlanIndex >= bossPlan.length) {
      if (!plan.name.length && !plan.boss.length) return;

      dispatch(addBossPlan(plan));
    } else dispatch(insertBossPlan({ index: bossPlanIndex, value: plan }));
  };

  useEffect(() => {
    if (bossPlanIndex < 0 || bossPlanIndex >= bossPlan.length) {
      setCurrentPlan(DEFAULT_CURRENT_PLAN);
      return;
    }

    const loadedDifficulty = new Map<BOSS_TYPE, BOSS_DIFFICULTY>();
    const loadedParty = new Map<BOSS_TYPE, number>();
    const plan = bossPlan[bossPlanIndex];
    plan.boss.forEach((b) => {
      loadedDifficulty.set(b.type, b.difficulty);
      loadedParty.set(b.type, b.partyMembers);
    });

    setCurrentPlan({
      name: plan.name,
      image: plan.image,
      order: plan.order,
      difficulty: loadedDifficulty,
      partyMembers: loadedParty,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossPlanIndex]);

  const orderBasicFragments = () =>
    Object.entries(BOSS).map(([type, boss], i) => (
      <Fragment key={"boss-" + i}>
        <Flex
          gap={2}
          pr={4}
          py={1}
          borderTopWidth={1}
          alignItems="center"
          opacity={
            !currentPlan.difficulty.has(type as BOSS_TYPE) &&
            currentPlan.difficulty.size >= BOSS_MAXIMUN_SELECTABLE
              ? 0.4
              : 1
          }
        >
          <Image src={boss.icon} />
          <Text display={["none", "none", "block"]}>{boss.name}</Text>
        </Flex>
        <Flex gap={2} py={1} borderTopWidth={1} wrap="wrap">
          {Object.entries(boss.prices).map(([difficulty], j) => (
            <Checkbox
              key={`boss-difficulty-${i}-${j}`}
              mr={2}
              isDisabled={
                !currentPlan.difficulty.has(type as BOSS_TYPE) &&
                currentPlan.difficulty.size >= BOSS_MAXIMUN_SELECTABLE
              }
              isChecked={
                currentPlan.difficulty.get(type as BOSS_TYPE) == difficulty
              }
              onChange={(event) => {
                const newDifficulty = new Map(currentPlan.difficulty);
                if (event.target.checked)
                  newDifficulty.set(
                    type as BOSS_TYPE,
                    difficulty as BOSS_DIFFICULTY
                  );
                else newDifficulty.delete(type as BOSS_TYPE);

                setCurrentPlan((prevPlan) => ({
                  ...prevPlan,
                  difficulty: newDifficulty,
                }));
              }}
            >
              <Center>
                <Badge
                  color={COLOR[difficulty as BOSS_DIFFICULTY]?.text}
                  bgColor={COLOR[difficulty as BOSS_DIFFICULTY]?.back}
                  borderColor={COLOR[difficulty as BOSS_DIFFICULTY]?.border}
                  borderWidth={1}
                  fontSize="xx-small"
                >
                  {difficulty}
                </Badge>
              </Center>
            </Checkbox>
          ))}
        </Flex>
        <Center py={1} borderTopWidth={1}>
          <Select
            size="xs"
            value={currentPlan.partyMembers.get(type as BOSS_TYPE) ?? 1}
            onChange={(event) => {
              const value = parseInt(event.target.value);
              const newPartyMembers = new Map(currentPlan.partyMembers);

              if (value == 1) newPartyMembers.delete(type as BOSS_TYPE);
              else newPartyMembers.set(type as BOSS_TYPE, value);

              setCurrentPlan((prevPlan) => ({
                ...prevPlan,
                partyMembers: newPartyMembers,
              }));
            }}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </Select>
        </Center>
        <Flex
          gap={2}
          pl={4}
          py={1}
          borderTopWidth={1}
          justify="end"
          alignItems="center"
          fontSize="xs"
        >
          {currentPlan.difficulty.has(type as BOSS_TYPE) &&
            Math.round(
              getPrice(
                type as BOSS_TYPE,
                currentPlan.difficulty.get(type as BOSS_TYPE)!
              ) / (currentPlan.partyMembers.get(type as BOSS_TYPE) ?? 1)
            ).toLocaleString()}
        </Flex>
      </Fragment>
    ));
  const orderPriceFragments = () =>
    Object.entries(BOSS)
      .flatMap(([type, boss]) =>
        Object.entries(boss.prices).map(([difficulty]) => ({
          type: type as BOSS_TYPE,
          difficulty: difficulty as BOSS_DIFFICULTY,
          name: boss.name,
          icon: boss.icon,
          price: boss.prices[difficulty as BOSS_DIFFICULTY] ?? 0,
        }))
      )
      .sort((a, b) =>
        currentPlan.order == "price-asc" ? a.price - b.price : b.price - a.price
      )
      .map(({ type, difficulty, name, icon, price }, i) => (
        <Fragment key={"boss-" + i}>
          <Flex
            gap={2}
            pr={4}
            py={1}
            borderTopWidth={1}
            alignItems="center"
            opacity={
              !currentPlan.difficulty.has(type) &&
              currentPlan.difficulty.size >= BOSS_MAXIMUN_SELECTABLE
                ? 0.4
                : 1
            }
          >
            <Image src={icon} />
            <Text display={["none", "none", "block"]}>{name}</Text>
          </Flex>
          <Flex gap={2} py={1} borderTopWidth={1} wrap="wrap">
            <Checkbox
              key={`boss-difficulty-${i}`}
              mr={2}
              isDisabled={
                !currentPlan.difficulty.has(type) &&
                currentPlan.difficulty.size >= BOSS_MAXIMUN_SELECTABLE
              }
              isChecked={currentPlan.difficulty.get(type) == difficulty}
              onChange={(event) => {
                const newDifficulty = new Map(currentPlan.difficulty);
                if (event.target.checked) newDifficulty.set(type, difficulty);
                else newDifficulty.delete(type);

                setCurrentPlan((prevPlan) => ({
                  ...prevPlan,
                  difficulty: newDifficulty,
                }));
              }}
            >
              <Center>
                <Badge
                  color={COLOR[difficulty]?.text}
                  bgColor={COLOR[difficulty]?.back}
                  borderColor={COLOR[difficulty]?.border}
                  borderWidth={1}
                  fontSize="xx-small"
                >
                  {difficulty}
                </Badge>
              </Center>
            </Checkbox>
          </Flex>
          <Center py={1} borderTopWidth={1}>
            <Select
              size="xs"
              value={currentPlan.partyMembers.get(type as BOSS_TYPE) ?? 1}
              onChange={(event) => {
                const value = parseInt(event.target.value);
                const newPartyMembers = new Map(currentPlan.partyMembers);

                if (value == 1) newPartyMembers.delete(type as BOSS_TYPE);
                else newPartyMembers.set(type as BOSS_TYPE, value);

                setCurrentPlan((prevPlan) => ({
                  ...prevPlan,
                  partyMembers: newPartyMembers,
                }));
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </Select>
          </Center>
          <Flex
            gap={2}
            pl={4}
            py={1}
            borderTopWidth={1}
            justify="end"
            alignItems="center"
            fontSize="xs"
          >
            {Math.round(
              price / (currentPlan.partyMembers.get(type) ?? 1)
            ).toLocaleString()}
          </Flex>
        </Fragment>
      ));

  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onClose={() => {
        saveData();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Flex} pr={24} gap={4} pb={0} align="center">
          <Image
            boxSize="48px"
            src={currentPlan.image.length ? currentPlan.image : characterBlank}
            filter={
              currentPlan.image.length
                ? undefined
                : "opacity(0.2) drop-shadow(0 0 0 #000000);"
            }
            style={{ imageRendering: "pixelated" }}
          />
          <NameEditable
            name={currentPlan.name}
            onNameChanged={(name) =>
              setCurrentPlan((prevPlan) => ({ ...prevPlan, name }))
            }
            onImageReceived={(image) =>
              setCurrentPlan((prevPlan) => ({ ...prevPlan, image }))
            }
          />
        </ModalHeader>
        <Flex position="absolute" top={2} right={12} gap={1}>
          <ModalDeleteButton
            onClick={() => {
              if (bossPlanIndex >= 0 && bossPlanIndex < bossPlan.length)
                dispatch(deleteBossPlan(bossPlanIndex));
              onClose();
            }}
          />
          <ModalCopyButton
            onClick={() => {
              copyData();
              onClose();
            }}
          />
        </Flex>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <Flex justify="end" align="center" pb={4} gap={2}>
            <Badge
              colorScheme={
                currentPlan.difficulty.size == BOSS_MAXIMUN_SELECTABLE
                  ? "blue"
                  : undefined
              }
            >
              {currentPlan.difficulty.size} / {BOSS_MAXIMUN_SELECTABLE}
            </Badge>
            <Select
              w="auto"
              size="xs"
              onChange={(event) =>
                setCurrentPlan((prevPlan) => ({
                  ...prevPlan,
                  order: event.target.value,
                }))
              }
            >
              <option value="">기본순</option>
              <option value="price-asc">가격 오름차순</option>
              <option value="price-desc">가격 내림차순</option>
            </Select>
          </Flex>
          <SimpleGrid gridTemplateColumns="max-content 1fr max-content max-content">
            <Heading size="xs" pb={2}>
              보스
            </Heading>
            <Heading size="xs" pb={2}>
              난이도
            </Heading>
            <Heading size="xs" pb={2}>
              인원 수
            </Heading>
            <Heading size="xs" pb={2} textAlign="end">
              가격
            </Heading>
            {currentPlan.order && currentPlan.order.startsWith("price")
              ? orderPriceFragments()
              : orderBasicFragments()}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function ModalDeleteButton({ onClick }: { onClick?: () => void }) {
  return (
    <Tooltip label="삭제">
      <IconButton
        aria-label="delete"
        variant="ghost"
        icon={<FiTrash2 />}
        size="sm"
        colorScheme="red"
        onClick={onClick}
      />
    </Tooltip>
  );
}

function ModalCopyButton({ onClick }: { onClick?: () => void }) {
  return (
    <Tooltip label="복사">
      <IconButton
        aria-label="copy"
        variant="ghost"
        icon={<FiCopy />}
        size="sm"
        onClick={onClick}
      />
    </Tooltip>
  );
}
