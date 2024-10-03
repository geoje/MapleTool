import { useToast, UseToastOptions } from "@chakra-ui/react";

const useCustomToast = (options?: UseToastOptions) => {
  const toast = useToast();
  return (props: UseToastOptions) =>
    toast({
      position: "top-right",
      isClosable: true,
      ...options,
      ...props,
    });
};

export const useErrorToast = (options?: UseToastOptions) =>
  useCustomToast({
    status: "error",
    ...options,
  });
export const useInfoToast = (options?: UseToastOptions) =>
  useCustomToast({
    status: "info",
    ...options,
  });
export const useSuccessToast = (options?: UseToastOptions) =>
  useCustomToast({
    status: "success",
    ...options,
  });
export const useLoadingToast = (options?: UseToastOptions) =>
  useCustomToast({
    status: "loading",
    ...options,
  });
export const useWarningToast = (options?: UseToastOptions) =>
  useCustomToast({
    status: "warning",
    ...options,
  });
