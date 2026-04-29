import { Badge } from "@/components/ui/badge";

type Status = "active" | "invited" | "suspended";

type StatusBadgeProps = {
  status: Status;
};

const styles: Record<Status, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  invited: "border-blue-200 bg-blue-50 text-blue-700",
  suspended: "border-rose-200 bg-rose-50 text-rose-700"
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge className={styles[status]}>{status}</Badge>;
}
