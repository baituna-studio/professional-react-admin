import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function PageHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <header className={cn("space-y-2", className)} {...props} />;
}

export function PageHeaderTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-2xl font-semibold text-slate-900", className)} {...props} />;
}

export function PageHeaderDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-slate-500", className)} {...props} />;
}
