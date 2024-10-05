import { Box, Button, Icon, Text, useColorMode } from "@chakra-ui/react";
import { forwardRef, useEffect } from "react";
import { LuGripVertical, LuX } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
  deleteHistory,
  setName,
  setNameAndAddHistory,
} from "../../../stores/userSlice";
import { useBasicQuery } from "../../../stores/characterApi";
import { useSuccessToast, useWarningToast } from "../../../hooks/useToast";
import { useSortable } from "@dnd-kit/sortable";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import CharacterContent from "./characterContent";

export default function CharacterButton({
  name,
  readOnly,
}: {
  name: string;
  readOnly?: boolean;
}) {
  const isDark = useColorMode().colorMode == "dark";
  const toastSuccess = useSuccessToast();
  const toastWarning = useWarningToast();

  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.name);
  const selected = !readOnly && userName == name;
  const { data, error, isFetching, refetch } = useBasicQuery(name, {
    skip: !name,
  });

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: name });

  const onClick = () => {
    if (selected) {
      dispatch(setName(""));
      return;
    }
    dispatch(setNameAndAddHistory(name));
  };

  const transformToString = ({
    x,
    y,
    scaleX,
    scaleY,
  }: {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
  }) => `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`;

  useEffect(() => {
    if (!selected || !name) return;

    refetch().then((res) => {
      if (error) {
        toastWarning({
          title: "캐릭터 기본 정보 갱신 실패",
          description: (
            <>
              <Text>{name}</Text>
              <Text>{JSON.stringify(error)}</Text>
            </>
          ),
        });
        return res;
      }

      toastSuccess({
        title: "캐릭터 기본 정보 갱신됨",
        description: name,
      });
      return res;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <Button
      ref={setNodeRef}
      p={2}
      w={40}
      size="xs"
      height="auto"
      flexDir="column"
      variant={name && selected ? undefined : "ghost"}
      opacity={isDragging ? 0.4 : undefined}
      transform={transform ? transformToString(transform) : undefined}
      transition={transition}
      onClick={onClick}
    >
      {name && selected && (
        <>
          <DeleteButton
            isDark={isDark}
            onClick={() => dispatch(deleteHistory(name))}
          />
        </>
      )}
      {(readOnly || (name && selected)) && (
        <>
          <Handle
            attributes={attributes}
            listeners={listeners}
            ref={setActivatorNodeRef}
          />
        </>
      )}
      <CharacterContent
        isFetching={isFetching}
        data={data}
        fallbackName={name}
      />
    </Button>
  );
}

function DeleteButton({
  isDark,
  onClick,
}: {
  isDark: boolean;
  onClick: () => void;
}) {
  return (
    <Box
      position="absolute"
      top={-2}
      right={-2}
      transform="auto"
      background={isDark ? "whiteAlpha.200" : "blackAlpha.200"}
      transition="background 0.2s"
      p={1}
      borderRadius="100%"
      onClick={onClick}
      _hover={{
        background: isDark ? "whiteAlpha.400" : "blackAlpha.400",
      }}
    >
      <Icon as={LuX} />
    </Box>
  );
}

const Handle = forwardRef<
  HTMLDivElement,
  {
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap | undefined;
  }
>(({ attributes, listeners }, ref) => {
  return (
    <Box
      ref={ref}
      position="absolute"
      h={4}
      px={1}
      left={0}
      color={"gray.500"}
      cursor="grab"
      {...attributes}
      {...listeners}
    >
      <Icon as={LuGripVertical} w={4} h={4} />
    </Box>
  );
});
