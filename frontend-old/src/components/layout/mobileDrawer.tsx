import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import ExpandedSidebar from "./expandedSidebar";

export default function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
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
