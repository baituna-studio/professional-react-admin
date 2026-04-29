import { cn } from "@/lib/cn";

type NavItemProps = {
  label: string;
  href: string;
  active: boolean;
};

export function NavItem({ label, href, active }: NavItemProps) {
  return (
    <a
      href={href}
      className={cn(
        "block rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium transition",
        active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </a>
  );
}
