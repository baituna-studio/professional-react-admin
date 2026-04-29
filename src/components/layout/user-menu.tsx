import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type UserMenuProps = {
  onLogout?: () => void;
};

export function UserMenu({ onLogout }: UserMenuProps) {
  return (
    <div className="flex items-center gap-2">
      <Badge>Admin</Badge>
      <Button variant="outline" size="sm" aria-label="User menu">
        Alex Morgan
      </Button>
      <Button variant="ghost" size="sm" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}
