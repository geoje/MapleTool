import { Box, Button, Icon, Spinner } from "@chakra-ui/react";
import { forwardRef, useEffect } from "react";
import { LuGripVertical } from "react-icons/lu";
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
import DeleteButton from "../../../components/deleteButton";

export default function CharacterButton({
  name,
  readOnly,
}: {
  name: string;
  readOnly?: boolean;
}) {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.name);
  const selected = !readOnly && userName == name;
  const { data, isFetching, isSuccess, isError, refetch } = useBasicQuery(
    name,
    {
      skip: !name,
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
          <DeleteButton onClick={() => dispatch(deleteHistory(name))} />
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
