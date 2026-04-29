import { NavItem } from "@/components/layout/nav-item";
import { cn } from "@/lib/cn";
import { useUiStore } from "@/store/ui-store";

export type NavConfig = {
  label: string;
  href: string;
};

type SidebarProps = {
  items: NavConfig[];
  currentPath: string;
};

export function Sidebar({ items, currentPath }: SidebarProps) {
  const { sidebarCollapsed } = useUiStore();

  return (
    <aside
      className={cn(
        "hidden min-h-screen border-r border-slate-200 bg-white px-3 py-5 md:block",
        sidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Admin</p>
      <nav className="space-y-1">
        {items.map((item) => (
          <NavItem key={item.href} label={sidebarCollapsed ? item.label.slice(0, 1) : item.label} href={item.href} active={currentPath === item.href} />
        ))}
      </nav>
    </aside>
  );
}
