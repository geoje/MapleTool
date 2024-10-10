import { Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
  LiaSortDownSolid,
  LiaSortSolid,
  LiaSortUpSolid,
} from "react-icons/lia";
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
          <LiaSortUpSolid />
        ) : bossPlan.order == "price-desc" ? (
          <LiaSortDownSolid />
        ) : (
          <LiaSortSolid />
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
