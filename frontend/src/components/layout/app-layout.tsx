import { ReactFlowProvider } from "@xyflow/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import abilityNavIcon from "@/assets/ability/icon.png";
import crystalPurple from "@/assets/crystal/purple.png";
import meso from "@/assets/enhance/meso.png";
import artifactNavIcon from "@/assets/union-artifact/point.png";
import { CanvasControls } from "@/components/layout/canvas-controls";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/boss-revenue", label: "보스 수익", icon: crystalPurple },
  { to: "/enhance-cost", label: "강화 비용", icon: meso },
  { to: "/union-artifact", label: "유니온 아티팩트", icon: artifactNavIcon },
  { to: "/ability-build", label: "어빌리티 빌드", icon: abilityNavIcon },
];

const TITLES: Record<string, string> = {
  "/boss-revenue": "보스 수익",
  "/enhance-cost": "강화 비용",
  "/union-artifact": "유니온 아티팩트",
  "/ability-build": "어빌리티 빌드",
};

function NavLinkItem({
  to,
  label,
  icon,
  onClick,
  size = "default",
  outline = false,
}: (typeof NAV_ITEMS)[number] & { onClick?: () => void; size?: "default" | "sm"; outline?: boolean }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          // Border is always reserved (transparent by default) so toggling `outline`
          // only swaps its color, never the box size - an actual border-width change
          // on an auto-sized element shifts every later item, even with border-box.
          "flex items-center rounded-full border border-transparent transition-colors duration-150 hover:bg-muted",
          size === "sm" ? "h-7 gap-1 px-2.5 text-[0.8rem]" : "gap-2 px-3 py-1.5 text-sm",
          isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground",
          outline && "border-border bg-background hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
        )
      }
    >
      <img
        src={icon}
        alt=""
        className={cn("shrink-0 object-contain", size === "sm" ? "size-3.5" : "size-4")}
      />
      {label}
    </NavLink>
  );
}

// The ability-build page is a full-bleed React Flow canvas: the nav bar floats
// fixed and transparent above it (so panned nodes are visible sliding underneath),
// instead of pushing page content down like every other route.
const CANVAS_ROUTES = ["/ability-build"];

export function AppLayout() {
  // CanvasControls needs useReactFlow(), which only works below a
  // ReactFlowProvider - hoisted here (rather than inside AbilityBuildPage) so
  // the nav bar buttons and the canvas share the same flow instance.
  return (
    <ReactFlowProvider>
      <AppLayoutContent />
    </ReactFlowProvider>
  );
}

function AppLayoutContent() {
  const { pathname } = useLocation();
  const title = TITLES[pathname];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCanvasRoute = CANVAS_ROUTES.includes(pathname);

  useEffect(() => {
    toast.dismiss();
    document.title = title ? `메이플 도구 | ${title}` : "메이플 도구";
  }, [pathname, title]);

  return (
    <div
      className={cn(
        "flex min-h-svh flex-col",
        !isCanvasRoute && "bg-[linear-gradient(to_bottom,var(--color-background),var(--gradient-end)_240px)]"
      )}
    >
      <Collapsible
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        className={cn(isCanvasRoute && "fixed inset-x-0 top-0 z-50")}
      >
        <header className="flex h-14 shrink-0 items-center gap-2 px-4">
          <div className="md:hidden">
            <CollapsibleTrigger asChild>
              <Button variant={isCanvasRoute ? "outline" : "ghost"} size="sm" className="gap-2 rounded-full">
                {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                메뉴
              </Button>
            </CollapsibleTrigger>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLinkItem key={item.to} {...item} outline={isCanvasRoute} />
            ))}
          </nav>
          <div className="flex-1" />
          {isCanvasRoute && <CanvasControls />}
        </header>
        <CollapsibleContent className="md:hidden">
          <nav className="flex flex-wrap gap-1 px-4 pt-0 pb-3">
            {NAV_ITEMS.map((item) => (
              <NavLinkItem
                key={item.to}
                {...item}
                size="sm"
                outline={isCanvasRoute}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </CollapsibleContent>
      </Collapsible>
      <main
        className={cn(
          "flex flex-1 flex-col gap-4 px-4 pb-4",
          isCanvasRoute && "fixed inset-0 z-0 gap-0 p-0"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}
