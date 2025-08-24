import {
  Flex,
  Icon,
  IconButton,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";
import { LuActivity, LuInfo } from "react-icons/lu";

export default function Notice() {
  const dark = useColorMode().colorMode == "dark";
  const palleteGray300 = dark ? "gray.400" : "gray.500";

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="help"
          variant="ghost"
          borderRadius="full"
          icon={<LuInfo />}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <UnorderedList fontSize="small">
              <ListItem>
                <Flex align="center" gap={2}>
                  <Icon
                    as={LuActivity}
                    strokeWidth={3}
                    color={palleteGray300}
                  />
                  <Text>접속한지 오래되어 기능이 제한된 캐릭터</Text>
                </Flex>
              </ListItem>
            </UnorderedList>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
