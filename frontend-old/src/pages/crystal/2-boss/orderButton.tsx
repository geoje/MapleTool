import { Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";
import { setBossOrder } from "../../../stores/userSlice";

export default function OrderButton({ selected }: { selected: number }) {
  const dispatch = useAppDispatch();
  const bossPlans = useAppSelector((state) => state.user.bossPlans);
  const bossPlan =
    selected >= 0 && selected < bossPlans.length ? bossPlans[selected] : null;

  if (!bossPlan) return <></>;

  return (
    <Button
      size="sm"
      variant="ghost"
      rightIcon={
        bossPlan.order == "price-asc" ? (
          <TiArrowSortedUp />
        ) : bossPlan.order == "price-desc" ? (
          <TiArrowSortedDown />
        ) : (
          <TiArrowUnsorted />
        )
      }
      onClick={() =>
        dispatch(
          setBossOrder({ index: selected, order: getNextOrder(bossPlan.order) })
        )
      }
    >
      가격
    </Button>
  );
}

function getNextOrder(order: string) {
  return order == "" ? "price-asc" : order == "price-asc" ? "price-desc" : "";
}
