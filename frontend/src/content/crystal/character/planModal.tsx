import {
  Badge,
  Center,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
  COLOR,
} from "../../../service/user/crystal/bossConstants";

interface BossSelect {
  name: string;
  difficulty: string;
}

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
  const nameRef = useRef(null);

  const [selected, setSelected] = useState<BossSelect[]>([]);

  const saveData = () => {};

  useEffect(() => {
    console.log(nameRef);
  }, [bossPlanIndex]);

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={() => {
        saveData();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pr={24}>
          <Editable ref={nameRef} placeholder="클릭하여 캐릭터 이름 입력">
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
          <SimpleGrid gridTemplateColumns="max-content 1fr" gap={2}>
            {Object.entries(BOSS).map(([_, boss], i) => (
              <Fragment key={"boss-" + i}>
                <Flex gap={2}>
                  <Image src={boss.icon} />
                  <Text>{boss.name}</Text>
                </Flex>
                <Flex gap={4} pl={2}>
                  {Object.entries(boss.prices).map(([difficulty, _], j) => (
                    <Checkbox
                      key={`boss-difficulty-${i}-${j}`}
                      sx={{
                        label: {
                          marginLeft: 0,
                        },
                      }}
                      onChange={(event) => {
                        console.log(event.target.value);
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

function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
