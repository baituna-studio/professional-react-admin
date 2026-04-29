import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Sidebar, type NavConfig } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import type { ReactNode } from "react";

type AppLayoutProps = {
  title: string;
  navItems: NavConfig[];
  currentPath: string;
  children: ReactNode;
};

export function AppLayout({ title, navItems, currentPath, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MobileSidebar items={navItems} currentPath={currentPath} />
      <div className="flex min-h-screen">
        <Sidebar items={navItems} currentPath={currentPath} />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar title={title} />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
