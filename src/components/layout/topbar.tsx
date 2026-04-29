import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUiStore } from "@/store/ui-store";

type TopbarProps = {
  title: string;
};

export function Topbar({ title }: TopbarProps) {
  const { toggleSidebar, setMobileSidebarOpen, commandMenuOpen, setCommandMenuOpen } = useUiStore();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur md:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="md:hidden" onClick={() => setMobileSidebarOpen(true)}>
            Menu
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={toggleSidebar}>
            Collapse
          </Button>
          <h1 className="text-base font-semibold text-slate-900 md:text-lg">{title}</h1>
        </div>

        <div className="hidden w-72 md:block">
          <Input placeholder="Search..." aria-label="Search" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setCommandMenuOpen(!commandMenuOpen)}>
            Quick Cmd
          </Button>
          <Button variant="ghost" size="sm" aria-label="Notifications">
            Alerts
          </Button>
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
