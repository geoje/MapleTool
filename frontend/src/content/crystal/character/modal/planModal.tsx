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

export default function PlanModal({
  isOpen,
  onClose,
  onDelete,
  bossPlanIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  bossPlanIndex: number;
}) {
  const dispatch = useAppDispatch();
  const bossPlan = useAppSelector((state) => state.user.bossPlan);

  const [name, setName] = useState(bossPlan[bossPlanIndex].name);
  const [imageUrl, setImageUrl] = useState(bossPlan[bossPlanIndex].image);
  const [selectedDiffi, setSelectedDiffi] = useState<
    Map<BOSS_TYPE, BOSS_DIFFICULTY>
  >(new Map<BOSS_TYPE, BOSS_DIFFICULTY>());
  const [selectedParty, setSelectedParty] = useState<Map<BOSS_TYPE, number>>(
    new Map<BOSS_TYPE, number>()
  );

  const clearData = () => {
    setName("");
    setImageUrl("");
    setSelectedDiffi(new Map<BOSS_TYPE, BOSS_DIFFICULTY>());
    setSelectedParty(new Map<BOSS_TYPE, number>());
  };
  const saveData = () => {
    const plan: BossPlan = {
      name,
      image: imageUrl,
      boss: [],
    };
    Object.entries(BOSS).forEach(([type, _]) => {
      if (selectedDiffi.has(type as BOSS_TYPE)) {
        plan.boss.push({
          type: type as BOSS_TYPE,
          difficulty: selectedDiffi.get(type as BOSS_TYPE)!,
          partyMembers: selectedParty.get(type as BOSS_TYPE) ?? 1,
        });
      }
    });

    if (bossPlanIndex < 0 || bossPlanIndex >= bossPlan.length) {
      if (!plan.name.length && !plan.boss.length) return;
      dispatch(addUserBossPlan(plan));
      clearData();
    } else dispatch(setUserBossPlan({ index: bossPlanIndex, value: plan }));
  };

  useEffect(() => {
    console.log(bossPlanIndex);

    if (bossPlanIndex < 0 || bossPlanIndex >= bossPlan.length) {
      clearData();
      return;
    }

    const difficulty = new Map<BOSS_TYPE, BOSS_DIFFICULTY>();
    const party = new Map<BOSS_TYPE, number>();
    const plan = bossPlan[bossPlanIndex];

    setName(plan.name);
    setImageUrl(plan.image);

    plan.boss.forEach((b) => {
      difficulty.set(b.type, b.difficulty);
      party.set(b.type, b.partyMembers);
    });

    setSelectedDiffi(difficulty);
    setSelectedParty(party);
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
              imageUrl?.length ? imageUrl : "/union-raid/character-blank.png"
            }
            filter={
              imageUrl ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"
            }
            style={{ imageRendering: "pixelated" }}
          />
          <NameEditable
            name={name}
            onNameChanged={setName}
            onImageReceived={setImageUrl}
          />
        </ModalHeader>
        <ModalDeleteButton
          onClick={() => {
            if (bossPlanIndex >= 0 && bossPlanIndex < bossPlan.length)
              dispatch(spliceUserBossPlan(bossPlanIndex));
            onDelete();
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
                      !selectedDiffi.has(type as BOSS_TYPE) &&
                      selectedDiffi.size >= BOSS_MAXIMUN_SELECTABLE
                        ? 0.6
                        : 1
                    }
                  >
                    {boss.name}
                  </Text>
                </Flex>
                <Flex gap={2} py={1} borderTopWidth={1} wrap="wrap">
                  {Object.entries(boss.prices).map(([difficulty, _], j) => (
                    <Checkbox
                      key={`boss-difficulty-${i}-${j}`}
                      mr={2}
                      isDisabled={
                        !selectedDiffi.has(type as BOSS_TYPE) &&
                        selectedDiffi.size >= BOSS_MAXIMUN_SELECTABLE
                      }
                      isChecked={
                        selectedDiffi.get(type as BOSS_TYPE) == difficulty
                      }
                      onChange={(event) => {
                        const temp = new Map(selectedDiffi);
                        if (event.target.checked)
                          temp.set(
                            type as BOSS_TYPE,
                            difficulty as BOSS_DIFFICULTY
                          );
                        else temp.delete(type as BOSS_TYPE);

                        setSelectedDiffi(temp);
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
