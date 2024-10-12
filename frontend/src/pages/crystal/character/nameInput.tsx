import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CgSearch } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { newBossPlan } from "../../../stores/userSlice";
import { useState } from "react";

export default function NameInput({
  setSelected,
}: {
  setSelected: (value: number) => void;
}) {
  const dispatch = useAppDispatch();
  const bossPlans = useAppSelector((state) => state.user.bossPlans);
  const [name, setName] = useState("");

  const handleSearching = () => {
    setSelected(bossPlans.length);
    dispatch(newBossPlan(name));
    setName("");
  };

  return (
    <InputGroup>
      <Input
        type="search"
        pr="2.5rem"
        variant="filled"
        placeholder="캐릭터명을 입력하세요."
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key == "Enter") handleSearching();
        }}
        onSubmit={handleSearching}
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
