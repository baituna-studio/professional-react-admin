import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  defaultSettingsValues,
  type SettingsFormErrors,
  type SettingsFormValues,
  validateSettings
} from "@/features/settings/settings.schema";
import { useMemo, useState } from "react";

export function SettingsPage() {
  const [values, setValues] = useState<SettingsFormValues>(defaultSettingsValues);
  const [errors, setErrors] = useState<SettingsFormErrors>({});
  const [toast, setToast] = useState<{ kind: "success" | "error"; message: string } | null>(null);

  const isDirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(defaultSettingsValues),
    [values]
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateSettings(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setToast({ kind: "error", message: "Please fix validation errors before saving." });
      return;
    }

    setToast({ kind: "success", message: "Settings saved successfully." });
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <PageHeader>
        <PageHeaderTitle>Settings</PageHeaderTitle>
        <PageHeaderDescription>Update profile, appearance preferences, and notifications.</PageHeaderDescription>
      </PageHeader>

      <form className="space-y-4" onSubmit={onSubmit}>
        <Card className="space-y-4">
          <h3 className="text-base font-semibold text-slate-900">Profile</h3>

          <Field label="Full Name" error={errors.fullName}>
            <Input
              aria-invalid={Boolean(errors.fullName)}
              value={values.fullName}
              onChange={(e) => setValues((p) => ({ ...p, fullName: e.target.value }))}
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <Input
              type="email"
              aria-invalid={Boolean(errors.email)}
              value={values.email}
              onChange={(e) => setValues((p) => ({ ...p, email: e.target.value }))}
            />
          </Field>

          <Field label="Job Title" error={errors.jobTitle}>
            <Input
              aria-invalid={Boolean(errors.jobTitle)}
              value={values.jobTitle}
              onChange={(e) => setValues((p) => ({ ...p, jobTitle: e.target.value }))}
            />
          </Field>
        </Card>

        <Card className="space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Appearance</h3>
          <select
            className="h-10 w-full rounded-[var(--radius-control)] border border-slate-300 px-3 text-sm"
            value={values.theme}
            onChange={(e) =>
              setValues((p) => ({ ...p, theme: e.target.value as SettingsFormValues["theme"] }))
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </Card>

        <Card className="space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Notifications</h3>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={values.notifyProductUpdates}
              onChange={(e) => setValues((p) => ({ ...p, notifyProductUpdates: e.target.checked }))}
            />
            Product updates
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={values.notifySecurityAlerts}
              onChange={(e) => setValues((p) => ({ ...p, notifySecurityAlerts: e.target.checked }))}
            />
            Security alerts
          </label>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button type="submit">Save Settings</Button>
          <Button
            type="button"
            variant="outline"
            disabled={!isDirty}
            onClick={() => {
              setValues(defaultSettingsValues);
              setErrors({});
              setToast({ kind: "success", message: "Form reset to defaults." });
            }}
          >
            Reset
          </Button>
        </div>
      </form>

      {toast ? (
        <div
          className={`rounded-[var(--radius-control)] border px-3 py-2 text-sm ${
            toast.kind === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      ) : (
        <EmptyState title="No recent updates" description="Save the form to show action feedback." />
      )}
    </div>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</label>
      {children}
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
