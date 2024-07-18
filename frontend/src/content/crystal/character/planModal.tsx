import {
  Badge,
  Center,
  Checkbox,
  createMultiStyleConfigHelpers,
  Editable,
  EditableInput,
  EditablePreview,
  extendTheme,
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
import { Fragment, useEffect, useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../reducer/hooks";
import { spliceUserBossPlan } from "../../../reducer/userSlice";
import {
  BOSS,
  BOSS_DIFFICULTY,
  BOSS_MAXIMUN_SELECTABLE,
  BOSS_TYPE,
  COLOR,
} from "../../../service/user/crystal/bossConstants";
import BossPlan from "../../../dto/user/crystal/bossPlan";

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
  const nameRef = useRef<HTMLInputElement>(null);

  const [selected, setSelected] = useState<Map<BOSS_TYPE, BOSS_DIFFICULTY>>(
    new Map<BOSS_TYPE, BOSS_DIFFICULTY>()
  );

  const saveData = () => {
    const plan: BossPlan = {
      name: nameRef.current?.value ?? "",
      boss: [],
    };
    Object.entries(BOSS).forEach(([type, boss]) => {
      if (selected.has(type as BOSS_TYPE)) {
        plan.boss.push({
          type: type as BOSS_TYPE,
          difficulty: selected.get(type as BOSS_TYPE)!,
          partyMembers: 1,
        });
      }
    });
  };

  useEffect(() => {
    setSelected(new Map<BOSS_TYPE, BOSS_DIFFICULTY>());
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
        <ModalHeader pr={24}>
          <Editable ref={nameRef} placeholder="캐릭터 이름">
            <EditablePreview />
            <EditableInput />
          </Editable>
        </ModalHeader>
        <ModalDeleteButton
          onClick={() => {
            dispatch(spliceUserBossPlan(bossPlanIndex));
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
                      !selected.has(type as BOSS_TYPE) &&
                      selected.size >= BOSS_MAXIMUN_SELECTABLE
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
                        !selected.has(type as BOSS_TYPE) &&
                        selected.size >= BOSS_MAXIMUN_SELECTABLE
                      }
                      isChecked={selected.get(type as BOSS_TYPE) == difficulty}
                      onChange={(event) => {
                        const temp = new Map(selected);
                        if (event.target.checked)
                          temp.set(
                            type as BOSS_TYPE,
                            difficulty as BOSS_DIFFICULTY
                          );
                        else temp.delete(type as BOSS_TYPE);

                        setSelected(temp);
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
