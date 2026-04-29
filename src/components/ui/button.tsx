import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "default" | "ghost" | "outline" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-slate-900 text-white hover:bg-slate-800",
  ghost: "bg-transparent text-slate-900 hover:bg-slate-200/70",
  outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
  destructive: "bg-rose-600 text-white hover:bg-rose-500"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base"
};

export function Button({ className, variant = "default", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-control)] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
