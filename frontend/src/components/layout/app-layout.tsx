import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import crystalPurple from "@/assets/crystal/purple.png";
import meso from "@/assets/enhance/meso.png";
import artifactNavIcon from "@/assets/union-artifact/point.png";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/boss-revenue", label: "보스 수익", icon: crystalPurple },
  { to: "/enhance-cost", label: "강화 비용", icon: meso },
  { to: "/union-artifact", label: "유니온 아티팩트", icon: artifactNavIcon },
];

const TITLES: Record<string, string> = {
  "/boss-revenue": "보스 수익",
  "/enhance-cost": "강화 비용",
  "/union-artifact": "유니온 아티팩트",
};

function NavLinkItem({ to, label, icon }: (typeof NAV_ITEMS)[number]) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors duration-150 hover:bg-muted",
          isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
        )
      }
    >
      <img src={icon} alt="" className="size-4 shrink-0 object-contain" />
      {label}
    </NavLink>
  );
}

function MobileNavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 rounded-full">
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
          메뉴
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto">
        <div className="flex flex-wrap gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLinkItem key={item.to} {...item} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function AppLayout() {
  const { pathname } = useLocation();
  const title = TITLES[pathname];

  useEffect(() => {
    toast.dismiss();
    document.title = title ? `메이플 도구 | ${title}` : "메이플 도구";
  }, [pathname, title]);

  return (
    <div className="flex min-h-svh flex-col bg-[linear-gradient(to_bottom,var(--color-background),var(--gradient-end)_320px)]">
      <header className="flex h-14 shrink-0 items-center gap-2 px-4">
        <div className="md:hidden">
          <MobileNavMenu />
        </div>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLinkItem key={item.to} {...item} />
          ))}
        </nav>
        <div className="flex-1" />
        <ThemeToggle />
      </header>
      <main className="flex flex-1 flex-col gap-4 px-4 pt-2 pb-4">
        <Outlet />
      </main>
    </div>
  );
}
