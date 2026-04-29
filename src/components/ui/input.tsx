import { cn } from "@/lib/cn";
import type { InputHTMLAttributes } from "react";

export function Input({ className, type = "text", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "h-10 w-full rounded-[var(--radius-control)] border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400",
        className
      )}
      {...props}
    />
  );
}
