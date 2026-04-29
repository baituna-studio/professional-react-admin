import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Separator({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("my-3 border-0 border-t border-slate-200", className)} {...props} />;
}
