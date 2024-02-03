import {
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  useEditableControls,
} from "@chakra-ui/react";
import { MdEdit, MdClose, MdCheck } from "react-icons/md";

export default function Home() {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="submit"
          icon={<MdCheck />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="cancel"
          icon={<MdClose />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="edit"
          size="sm"
          icon={<MdEdit />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Stack align="center">
      <Card>
        <CardBody>
          <Flex justify="center">
            <Image
              src="/union-raid/character-blank.png"
              filter="opacity(0.2) drop-shadow(0 0 0 #000000);"
              style={{ imageRendering: "pixelated" }}
            />
          </Flex>
          <Editable
            textAlign="center"
            defaultValue="Rasengan ⚡️"
            fontSize="2xl"
            isPreviewFocusable={false}
          >
            <EditablePreview />
            {/* Here is the custom input */}
            <Input as={EditableInput} />
            <EditableControls />
          </Editable>
        </CardBody>
      </Card>
      <Text>캐릭터를 등록하고 여러 서비스를 이용해보세요</Text>
      <Flex justify="center"></Flex>
    </Stack>
  );
}
