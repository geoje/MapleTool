import { IconButton } from "@chakra-ui/react";
import { LuChevronLeft } from "react-icons/lu";
import { useState } from "react";
import ExpandedSidebar from "./expandedSidebar";
import CollapsedSidebar from "./collapsedSidebar";

const KEY_COLLAPSED = "sidebar-collapsed";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem(KEY_COLLAPSED) != null
  );

  if (collapsed) {
    return (
      <CollapsedSidebar
        onExpand={() => {
          setCollapsed(false);
          localStorage.removeItem(KEY_COLLAPSED);
        }}
      />
    );
  }

  return (
    <ExpandedSidebar
      width="var(--chakra-sizes-2xs)"
      closeButton={
        <IconButton
          aria-label="expand"
          variant="ghost"
          icon={<LuChevronLeft size={20} />}
          onClick={() => {
            setCollapsed(true);
            localStorage.setItem(KEY_COLLAPSED, "true");
          }}
        />
      }
    />
  );
}
