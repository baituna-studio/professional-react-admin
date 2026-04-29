import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  return (
    <div className="flex items-center gap-2">
      <Badge>Admin</Badge>
      <Button variant="outline" size="sm" aria-label="User menu">
        Alex Morgan
      </Button>
    </div>
  );
}
