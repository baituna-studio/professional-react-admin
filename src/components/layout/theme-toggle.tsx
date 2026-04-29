import { Button } from "@/components/ui/button";

type ThemeMode = "light" | "dark";

function getStoredMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  const mode = getStoredMode();

  const onToggle = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Button variant="ghost" size="sm" aria-label="Toggle theme" onClick={onToggle}>
      {mode === "dark" ? "Light" : "Dark"}
    </Button>
  );
}
