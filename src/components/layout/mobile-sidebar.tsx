import type { NavConfig } from "@/components/layout/sidebar";
import { NavItem } from "@/components/layout/nav-item";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";

type MobileSidebarProps = {
  items: NavConfig[];
  currentPath: string;
};

export function MobileSidebar({ items, currentPath }: MobileSidebarProps) {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useUiStore();

  if (!mobileSidebarOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 md:hidden">
      <aside className="h-full w-72 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-600">Navigation</p>
          <Button variant="ghost" size="sm" onClick={() => setMobileSidebarOpen(false)}>
            Close
          </Button>
        </div>
        <nav className="space-y-1">
          {items.map((item) => (
            <div key={item.href} onClick={() => setMobileSidebarOpen(false)}>
              <NavItem label={item.label} href={item.href} active={currentPath === item.href} />
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
}
