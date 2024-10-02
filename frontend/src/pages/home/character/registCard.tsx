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
  Text,
} from "@chakra-ui/react";
import EditableControls from "./editableControls";
import {
  clearName,
  deleteHistory,
  setNameAndAddHistory,
} from "../../../stores/userSlice";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { useEffect, useState } from "react";
import HistoryButtons from "./historyButtons";
import { useGetCharacterBasicQuery } from "../../../stores/characterSlice";

export default function RegistCard() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.name);
  const [inputName, setInputName] = useState(userName ?? "");
  const { data, error, isFetching } = useGetCharacterBasicQuery(userName);

  useEffect(() => setInputName(userName), [userName, setInputName]);
  useEffect(() => console.error(error), [error]);
  useEffect(() => console.error(isFetching), [isFetching]);

  return (
    <Card w={336}>
      <CardBody>
        <Flex justify="center">
          <Image
            width={2 * 96}
            src={data?.character_image ?? "/union-raid/character-blank.png"}
            filter={
              userName ? undefined : "opacity(0.2) drop-shadow(0 0 0 #000000);"
            }
          />
        </Flex>
        <Editable
          textAlign="center"
          fontSize="2xl"
          placeholder="닉네임"
          py={2}
          value={inputName}
          onChange={(changedName) =>
            setInputName(changedName.replaceAll(" ", ""))
          }
          onSubmit={(name) => {
            if (!name.length) return;
            dispatch(setNameAndAddHistory(name));
          }}
        >
          <EditablePreview opacity={userName ? 1 : 0.4} pt="3px" pb="1px" />
          <Input as={EditableInput} fontSize="2xl" maxLength={12} />
          <Spacer h={2} />
          <EditableControls
            isLoading={false}
            existName={userName ? userName.length > 0 : false}
            onCharacterDelete={() => {
              if (!userName || !userName.length) return;
              dispatch(clearName());
              dispatch(deleteHistory(userName));
              setInputName("");
            }}
          />
        </Editable>
        <HistoryButtons />
      </CardBody>
    </Card>
  );
}
