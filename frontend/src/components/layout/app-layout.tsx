import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import abilityNavIcon from "@/assets/ability/icon.png";
import crystalPurple from "@/assets/crystal/purple.png";
import meso from "@/assets/enhance/meso.png";
import artifactNavIcon from "@/assets/union-artifact/point.png";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ThemeToggle } from "@/components/theme-toggle";
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
}: (typeof NAV_ITEMS)[number] & { onClick?: () => void; size?: "default" | "sm" }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center rounded-full transition-colors duration-150 hover:bg-muted",
          size === "sm" ? "h-7 gap-1 px-2.5 text-[0.8rem]" : "gap-2 px-3 py-1.5 text-sm",
          isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
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

export function AppLayout() {
  const { pathname } = useLocation();
  const title = TITLES[pathname];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    toast.dismiss();
    document.title = title ? `메이플 도구 | ${title}` : "메이플 도구";
  }, [pathname, title]);

  return (
    <div className="flex min-h-svh flex-col bg-[linear-gradient(to_bottom,var(--color-background),var(--gradient-end)_320px)]">
      <Collapsible open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <header className="flex h-14 shrink-0 items-center gap-2 px-4">
          <div className="md:hidden">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 rounded-full">
                {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                메뉴
              </Button>
            </CollapsibleTrigger>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLinkItem key={item.to} {...item} />
            ))}
          </nav>
          <div className="flex-1" />
          <ThemeToggle />
        </header>
        <CollapsibleContent className="md:hidden">
          <nav className="flex flex-wrap gap-1 px-4 pt-0 pb-3">
            {NAV_ITEMS.map((item) => (
              <NavLinkItem
                key={item.to}
                {...item}
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </CollapsibleContent>
      </Collapsible>
      <main className="flex flex-1 flex-col gap-4 px-4 pb-4">
        <Outlet />
      </main>
    </div>
  );
}
