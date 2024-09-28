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
} from "@chakra-ui/react";
import EditableControls from "./editableControls";
import { addHistory, clearName, setName } from "../../../stores/userSlice";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { useState } from "react";

export default function RegistCard() {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.user.name);
  const [curName, setCurName] = useState(name ?? "");

  return (
    <Card w={336}>
      <CardBody>
        <Flex justify="center">
          <Image
            width={2 * 96}
            src={"/union-raid/character-blank.png"}
            filter={
              name ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"
            }
          />
        </Flex>
        <Editable
          textAlign="center"
          fontSize="2xl"
          placeholder="닉네임"
          pt={2}
          value={curName}
          onChange={setCurName}
          onSubmit={(name) => {
            dispatch(setName(name));
            dispatch(addHistory(name));
          }}
        >
          <EditablePreview opacity={name ? 1 : 0.4} pt="3px" pb="1px" />
          <Input as={EditableInput} fontSize="2xl" maxLength={12} />
          <Spacer h={2} />
          <EditableControls
            isLoading={false}
            existName={name ? name.length > 0 : false}
            onCharacterDelete={() => {
              if (name) dispatch(clearName());
            }}
          />
        </Editable>
      </CardBody>
    </Card>
  );
}
