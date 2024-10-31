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
  useCustomToast({ ...options, status: "error" });
export const useInfoToast = (options?: UseToastOptions) =>
  useCustomToast({ ...options, status: "info" });
export const useSuccessToast = (options?: UseToastOptions) =>
  useCustomToast({ ...options, status: "success" });
export const useLoadingToast = (options?: UseToastOptions) =>
  useCustomToast({ ...options, status: "loading" });
export const useWarningToast = (options?: UseToastOptions) =>
  useCustomToast({ ...options, status: "warning" });
