import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { LuGripVertical } from "react-icons/lu";
import Profile from "./profile";
import BossSummary from "./bossSummary";
import BossPlan from "../../../types/user/bossPlan";
import { getBossIcon } from "../../../services/boss";
import { useBasicQuery } from "../../../stores/characterApi";
import { forwardRef } from "react";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useAppDispatch } from "../../../stores/hooks";
import { deleteBossPlan } from "../../../stores/userSlice";
import DeleteButton from "../../../components/action/deleteButton";

export default function CharacterButton({
  bossPlan,
  index,
  selected,
  readOnly,
  onClick,
}: {
  bossPlan: BossPlan;
  index: number;
  selected: number;
  readOnly?: boolean;
  onClick?: () => void;
}) {
  const dispatch = useAppDispatch();
  const { data, isFetching } = useBasicQuery(bossPlan.name, {
    skip: !bossPlan.name,
  });

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: bossPlan.name });

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

  return (
    <>
      <Button
        ref={setNodeRef}
        py={2}
        pl={5}
        gap={2}
        h="fit-content"
        justifyContent="space-between"
        variant={selected == index ? undefined : "ghost"}
        opacity={isDragging ? 0.4 : undefined}
        transform={transform ? transformToString(transform) : undefined}
        transition={transition ?? "transform 0ms linear"}
        onClick={onClick}
        leftIcon={
          <Profile
            src={data?.character_image}
            name={bossPlan.name}
            loading={isFetching}
          />
        }
      >
        {selected == index && (
          <Handle
            attributes={attributes}
            listeners={listeners}
            ref={setActivatorNodeRef}
          />
        )}

        <Flex gap={1} wrap="wrap">
          {bossPlan.boss.map((boss, i) => (
            <BossSummary
              key={`boss-${bossPlan.name}-${i}`}
              src={getBossIcon(boss.type)}
              difficulty={boss.difficulty}
              partyMembers={boss.members}
            />
          ))}
        </Flex>
        {selected == index && !readOnly && (
          <>
            <DeleteButton onClick={() => dispatch(deleteBossPlan(index))} />
          </>
        )}
      </Button>
    </>
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
