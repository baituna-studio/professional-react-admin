import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-slate-200/80 bg-white p-5 shadow-[var(--shadow-soft)]",
        className
      )}
      {...props}
    />
  );
}
