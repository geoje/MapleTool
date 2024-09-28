import {
  Card,
  CardBody,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Image,
  Input,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { AlertHello, AlertUsage } from "./alert/alert";
import EditableControls from "./character/editableControls";

export default function Home() {
  return (
    <Stack width="100%" justify="start" align="center">
      {false ? <AlertUsage /> : <AlertHello />}
      <Card mt={8} w={336}>
        <CardBody>
          <Flex justify="center">
            <Image
              width={2 * 96}
              src={"/union-raid/character-blank.png"}
              filter={
                false ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"
              }
              style={{ imageRendering: "pixelated" }}
            />
          </Flex>
          <Editable
            textAlign="center"
            fontSize="2xl"
            pt={2}
            placeholder="닉네임"
            defaultValue={""}
            onSubmit={console.log}
          >
            <EditablePreview opacity={false ? 1 : 0.4} pt="3px" pb="1px" />
            <Input as={EditableInput} fontSize="2xl" maxLength={12} />
            <Spacer h={2} />
            <EditableControls isLoading={false} onCharacterDelete={() => {}} />
          </Editable>
        </CardBody>
      </Card>
    </Stack>
  );
}
