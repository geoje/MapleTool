import {
  Alert,
  ButtonGroup,
  Card,
  CardBody,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Image,
  Input,
  Stack,
  useEditableControls,
} from "@chakra-ui/react";
import { MdEdit, MdClose, MdCheck, MdInfo } from "react-icons/md";

export default function Home() {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" pt={2}>
        <IconButton
          aria-label="submit"
          icon={<MdCheck />}
          variant="ghost"
          colorScheme="green"
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="cancel"
          icon={<MdClose />}
          variant="ghost"
          colorScheme="red"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center" pt={2}>
        <IconButton
          aria-label="edit"
          icon={<MdEdit />}
          variant="ghost"
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Stack justify="start" align="center" p={4}>
      <Alert status="info" variant="left-accent" gap={2}>
        <MdInfo />
        캐릭터를 등록하고 다양한 서비스를 이용해보세요
      </Alert>
      <Card mt={8}>
        <CardBody>
          <Flex justify="center">
            <Image
              width={2 * 96}
              src="/union-raid/character-blank.png"
              filter="opacity(0.2) drop-shadow(0 0 0 #000000);"
              style={{ imageRendering: "pixelated" }}
            />
          </Flex>
          <Editable textAlign="center" fontSize="2xl" placeholder="캐릭터 이름">
            <EditablePreview />
            <Input as={EditableInput} fontSize="2xl" />
            <EditableControls />
          </Editable>
        </CardBody>
      </Card>
    </Stack>
  );
}
