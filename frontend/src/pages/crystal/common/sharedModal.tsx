import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import CharacterButton from "../1-character/characterButton";
import ResultTable from "../3-statistics/resultTable";
import { useAppDispatch } from "../../../stores/hooks";
import { useSearchParams } from "react-router-dom";
import { parsePlansFromParams } from "../../../services/boss";
import { setBossPlans } from "../../../stores/userSlice";

export default function SharedModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const loadedBossPlans = parsePlansFromParams(searchParams);
  if (!loadedBossPlans.length) return <></>;

  const dispatch = useAppDispatch();

  return (
    <Modal size="xl" isOpen onClose={setSearchParams}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>공유된 보스수익</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Stack}>
          {loadedBossPlans.map((bossPlan, i) => (
            <CharacterButton
              key={"loaded-" + i}
              bossPlan={bossPlan}
              index={i}
              selected={-1}
              readOnly
            />
          ))}
        </ModalBody>
        <ModalFooter
          as={Flex}
          gap={2}
          wrap={{ base: "wrap", md: undefined }}
          justifyContent="space-between"
          alignItems="end"
        >
          <Box flexGrow={1} p={2}>
            <ResultTable bossPlans={loadedBossPlans} />
          </Box>
          <Stack flex={1}>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => {
                dispatch(setBossPlans(loadedBossPlans));
                setSearchParams();
              }}
            >
              불러오기
            </Button>
            <Button size="sm" onClick={() => setSearchParams()}>
              취소
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
