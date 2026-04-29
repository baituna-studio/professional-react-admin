import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-start gap-3">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
      {actionLabel ? (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );
}
