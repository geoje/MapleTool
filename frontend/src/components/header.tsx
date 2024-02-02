import {
  Button,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";

const CHARACTER_IMAGE_URL =
  "https://open.api.nexon.com/static/maplestory/Character/MMBBEPLPAFGGLIKBCNECJCJDNCAFKPACLKFLGODGIHEHEDNMKNDEKEKMOLPMKAJNKAIPKGEPFBHBBLAGKFDHELHCIOPKHBCEJHICNMFHFMBLBCDHKEHLMFDILHJILGPNHCIKOLPNJFMCGPIDHHDJENNIHPLAHNAGJPIALGOBPEMKGADPGMLPGANMNMBAIEBHFFNPEMCHEMMLAJJNADMCOLHOJJMMDOKNAHDPADHDCNDDNOKJMKEJHGDEMPHHNFKJ.png";

export default function Header() {
  return (
    <>
      <Show above="sm">
        <Desktop />
      </Show>
      <Show below="sm">
        <Mobile />
      </Show>
    </>
  );
}

function Desktop() {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <Flex p={2} align="center">
      <Heading>대쉬보드</Heading>
      <Spacer />
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          leftIcon={<Image boxSize="32px" src={CHARACTER_IMAGE_URL} />}
        >
          새벽욘
        </MenuButton>
        <MenuList>
          <MenuItem color="red" icon={<TbLogout />}>
            등록 해제
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

function Mobile() {
  return <></>;
}
