import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingCard() {
  return (
    <Card className="space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-3 w-28" />
    </Card>
  );
}
