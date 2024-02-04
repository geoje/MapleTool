import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { ExpandedSidebar } from "./sidebar";

export default function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <ExpandedSidebar
          closeButton={
            <IconButton
              aria-label="close"
              icon={<MdClose />}
              variant="ghost"
              onClick={onClose}
            />
          }
          onClose={onClose}
        />
      </DrawerContent>
    </Drawer>
  );
}
