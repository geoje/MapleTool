import { Box, Button, Icon, Spinner, useColorMode } from "@chakra-ui/react";
import { forwardRef, useEffect } from "react";
import { LuGripVertical, LuX } from "react-icons/lu";
import { FaCheck, FaExclamation, FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
  deleteHistory,
  setName,
  setNameAndAddHistory,
} from "../../../stores/userSlice";
import { useBasicQuery } from "../../../stores/characterApi";
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
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.name);
  const selected = !readOnly && userName == name;
  const { data, isFetching, isSuccess, isError, refetch } = useBasicQuery(
    name,
    {
      skip: readOnly || !name,
    }
  );

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

    refetch();

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
      transition={transition ?? "transform 0ms linear"}
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
        data={data}
        fallbackName={name}
        statusElement={
          isFetching ? (
            <Spinner size="xs" />
          ) : data ? (
            isSuccess ? (
              <Icon as={FaCheck} color="green.500" />
            ) : (
              <Icon as={FaExclamation} color="orange.500" />
            )
          ) : isError ? (
            <Icon as={FaTimes} color="red.500" />
          ) : (
            <></>
          )
        }
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
      w={5}
      h={5}
      p={1}
      transform="auto"
      background={isDark ? "whiteAlpha.200" : "blackAlpha.200"}
      transition="background 0.2s"
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
