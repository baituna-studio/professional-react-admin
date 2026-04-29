import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  children: ReactNode;
};

export function ProtectedRoute({ isAuthenticated, children }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-background p-6">
        <Card className="max-w-md">
          <h1 className="text-lg font-semibold text-slate-900">Session required</h1>
          <p className="mt-2 text-sm text-slate-500">Redirecting to login...</p>
        </Card>
      </main>
    );
  }

  return <>{children}</>;
}
