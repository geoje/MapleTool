import { Flex } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
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
import { useCallback, useState } from "react";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { moveHistory } from "../../../stores/userSlice";

export default function CharacterButtons() {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.user.history);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  }, []);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id == over.id) return;

      dispatch(
        moveHistory({ from: active.id as string, to: over.id as string })
      );

      setActiveId(null);
    },
    [dispatch]
  );
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
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
        {activeId ? <CharacterButton name={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
