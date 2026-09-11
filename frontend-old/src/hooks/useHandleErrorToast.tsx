import { useEffect } from "react";
import { useAppSelector } from "../stores/hooks";
import { useWarningToast } from "./useToast";
import { ListItem, UnorderedList } from "@chakra-ui/react";

export const useHandleErrorToast = () => {
  const error = useAppSelector((state) => state.query.error);
  const toastWarning = useWarningToast();

  useEffect(() => {
    if (!error) return;
    toastWarning({
      title: error.data?.detail ?? "서버 요청에 실패하였습니다.",
      description: error.data?.fields ? (
        <UnorderedList>
          {Object.entries(error.data.fields).map(([key, value]) => (
            <ListItem key={key}>
              {key} : {value}
            </ListItem>
          ))}
        </UnorderedList>
      ) : undefined,
    });
  }, [error, toastWarning]);
};
