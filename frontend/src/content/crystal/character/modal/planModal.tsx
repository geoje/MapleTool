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
import { FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../../reducer/hooks";
import {
  addUserBossPlan,
  setUserBossPlan,
  spliceUserBossPlan,
} from "../../../../reducer/userSlice";
import {
  BOSS,
  BOSS_DIFFICULTY,
  BOSS_MAXIMUN_SELECTABLE,
  BOSS_TYPE,
  COLOR,
} from "../../../../service/user/crystal/bossConstants";
import BossPlan from "../../../../dto/user/crystal/bossPlan";
import NameEditable from "./nameEditable";

const DEFAULT_CURRENT_PLAN = {
  name: "",
  image: "",
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
      if (!plan.name.length && !plan.boss.length) return;
      dispatch(addUserBossPlan(plan));
      setCurrentPlan(DEFAULT_CURRENT_PLAN);
    } else dispatch(setUserBossPlan({ index: bossPlanIndex, value: plan }));
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
      ``;
      loadedDifficulty.set(b.type, b.difficulty);
      loadedParty.set(b.type, b.partyMembers);
    });

    setCurrentPlan({
      name: plan.name,
      image: plan.image,
      difficulty: loadedDifficulty,
      partyMembers: loadedParty,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossPlanIndex]);

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
        <ModalHeader as={Flex} pr={24} gap={4} align="center">
          <Image
            boxSize="48px"
            src={
              currentPlan.image.length
                ? currentPlan.image
                : "/union-raid/character-blank.png"
            }
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
        <ModalDeleteButton
          onClick={() => {
            if (bossPlanIndex >= 0 && bossPlanIndex < bossPlan.length)
              dispatch(spliceUserBossPlan(bossPlanIndex));
            onClose();
          }}
        />
        <ModalCloseButton />
        <ModalBody pb={4}>
          <SimpleGrid gridTemplateColumns="max-content 1fr max-content">
            <Heading size="xs" pb={2}>
              보스
            </Heading>
            <Heading size="xs" pb={2}>
              난이도
            </Heading>
            <Heading size="xs" pb={2}>
              인원 수
            </Heading>
            {Object.entries(BOSS).map(([type, boss], i) => (
              <Fragment key={"boss-" + i}>
                <Flex
                  gap={2}
                  pr={4}
                  py={1}
                  borderTopWidth={1}
                  alignItems="center"
                >
                  <Image src={boss.icon} />
                  <Text
                    opacity={
                      !currentPlan.difficulty.has(type as BOSS_TYPE) &&
                      currentPlan.difficulty.size >= BOSS_MAXIMUN_SELECTABLE
                        ? 0.6
                        : 1
                    }
                  >
                    {boss.name}
                  </Text>
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
                        currentPlan.difficulty.get(type as BOSS_TYPE) ==
                        difficulty
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
                          borderColor={
                            COLOR[difficulty as BOSS_DIFFICULTY]?.border
                          }
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
                  <Select size="xs">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </Select>
                </Center>
              </Fragment>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function ModalDeleteButton({ onClick }: { onClick?: () => void }) {
  return (
    <Tooltip label="캐릭터 삭제">
      <IconButton
        aria-label="delete"
        variant="ghost"
        icon={<FiTrash2 />}
        size="sm"
        position="absolute"
        colorScheme="red"
        top={2}
        right={12}
        onClick={onClick}
      />
    </Tooltip>
  );
}
