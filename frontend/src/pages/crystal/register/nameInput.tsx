import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CgSearch } from "react-icons/cg";
import { useAppDispatch } from "../../../stores/hooks";
import { newBossPlan } from "../../../stores/userSlice";
import { useState } from "react";

export default function NameInput() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  const handleSearching = () => {
    dispatch(newBossPlan(name));
    setName("");
  };

  return (
    <InputGroup>
      <Input
        pr="2.5rem"
        variant="filled"
        placeholder="캐릭터명을 입력하세요."
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key == "Enter") handleSearching();
        }}
      />
      <InputRightElement>
        <IconButton
          aria-label="search"
          variant="ghost"
          size="sm"
          icon={<CgSearch />}
          onClick={handleSearching}
        />
      </InputRightElement>
    </InputGroup>
  );
}
