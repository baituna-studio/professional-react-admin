import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

type ChartCardProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ChartCard({ className, title, description, children, ...props }: ChartCardProps) {
  return (
    <Card className={cn("space-y-3", className)} {...props}>
      <div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description ? <p className="text-sm text-slate-500">{description}</p> : null}
      </div>
      <div className="h-44 rounded-[var(--radius-control)] border border-dashed border-slate-300 bg-slate-50 p-3">
        {children}
      </div>
    </Card>
  );
}
