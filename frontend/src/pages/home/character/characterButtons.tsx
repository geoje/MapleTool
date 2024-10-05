import { Flex } from "@chakra-ui/react";
import { useAppDispatch } from "../../../stores/hooks";
import {
  Active,
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import CharacterButton from "./characterButton";
import { useCallback, useMemo, useState } from "react";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { moveHistory } from "../../../stores/userSlice";

export default function CharacterButtons({ history }: { history: string[] }) {
  const dispatch = useAppDispatch();
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [active, setActive] = useState<Active | null>(null);
  const activeName = useMemo(
    () => history.find((name) => name === active?.id),
    [active, history]
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActive(event.active);
  }, []);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id == over.id) return;

      dispatch(
        moveHistory({ from: active.id as string, to: over.id as string })
      );

      setActive(null);
    },
    [dispatch]
  );
  const handleDragCancel = useCallback(() => {
    setActive(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={history} strategy={rectSortingStrategy}>
        <Flex gap={2}>
          {!history.length && <CharacterButton name="" />}
          {history.map((name, i) => (
            <CharacterButton key={"name-" + i} name={name} />
          ))}
        </Flex>
      </SortableContext>
      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: "0.4",
              },
            },
          }),
        }}
      >
        {activeName ? <CharacterButton name={activeName} readOnly /> : null}
      </DragOverlay>
    </DndContext>
  );
}
