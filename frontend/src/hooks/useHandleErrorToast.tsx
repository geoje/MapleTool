import { useEffect } from "react";
import { useAppSelector } from "../stores/hooks";
import { useWarningToast } from "./useToast";
import { Text } from "@chakra-ui/react";

export const useHandleErrorToast = () => {
  const error = useAppSelector((state) => state.query.error);
  const toastWarning = useWarningToast();

  useEffect(() => {
    if (!error) return;

    console.log(error);

    toastWarning({
      title: error.detail ?? "요청 실패",
      description: error.fields ? (
        <>
          {Array.from(error.fields.entries()).map(([key, value]) => (
            <Text>
              {key}: {value}
            </Text>
          ))}
        </>
      ) : undefined,
    });
  }, [error, toastWarning]);
};
