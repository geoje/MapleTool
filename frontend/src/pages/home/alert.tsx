import { Alert } from "@chakra-ui/react";
import { MdCheckCircle, MdInfo } from "react-icons/md";

export function AlertHello() {
  return (
    <Alert status="info" variant="left-accent" gap={2}>
      <MdInfo />
      캐릭터를 등록하고 다양한 서비스를 이용해보세요
    </Alert>
  );
}

export function AlertUsage() {
  return (
    <Alert status="success" variant="left-accent" gap={2}>
      <MdCheckCircle />
      좌측 또는 모바일일 경우 상단 메뉴 버튼을 누른 후 서비스를 선택하여
      이용하실 수 있습니다
    </Alert>
  );
}
