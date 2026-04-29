import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type StatCardProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string;
  trend?: string;
};

export function StatCard({ className, label, value, trend, ...props }: StatCardProps) {
  return (
    <Card className={cn("space-y-2", className)} {...props}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      {trend ? <p className="text-xs text-emerald-600">{trend}</p> : null}
    </Card>
  );
}
