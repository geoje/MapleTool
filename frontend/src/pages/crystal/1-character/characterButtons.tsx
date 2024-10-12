import { Stack } from "@chakra-ui/react";
import CharacterButton from "./characterButton";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { useCallback, useState } from "react";
import {
  Active,
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { moveBossPlan } from "../../../stores/userSlice";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

export default function CharacterButtons({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (value: number) => void;
}) {
  const dispatch = useAppDispatch();
  const bossPlans = useAppSelector((state) => state.user.bossPlans);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [active, setActive] = useState<Active | null>(null);
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActive(event.active);
  }, []);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id == over.id) {
        setActive(null);
        return;
      }

      setSelected(bossPlans.findIndex((plan) => plan.name == over.id));
      dispatch(
        moveBossPlan({ from: active.id as string, to: over.id as string })
      );

      setActive(null);
    },
    [bossPlans, dispatch, setSelected]
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
      <SortableContext
        items={bossPlans.map((plan) => ({ ...plan, id: plan.name }))}
        strategy={rectSortingStrategy}
      >
        <Stack gap={4} pt={4}>
          {bossPlans.map((plan, i) => (
            <CharacterButton
              key={"character-" + plan.name}
              bossPlan={plan}
              index={i}
              selected={selected}
              onClick={() => setSelected(selected == i ? -1 : i)}
            />
          ))}
        </Stack>
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
        {active ? (
          <CharacterButton
            bossPlan={bossPlans[selected]}
            index={selected}
            selected={selected}
            readOnly
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
