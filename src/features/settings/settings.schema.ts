export type SettingsFormValues = {
  fullName: string;
  email: string;
  jobTitle: string;
  theme: "light" | "dark" | "system";
  notifyProductUpdates: boolean;
  notifySecurityAlerts: boolean;
};

export type SettingsFormErrors = Partial<Record<keyof SettingsFormValues, string>>;

export const defaultSettingsValues: SettingsFormValues = {
  fullName: "Alex Morgan",
  email: "admin@example.com",
  jobTitle: "Product Admin",
  theme: "system",
  notifyProductUpdates: true,
  notifySecurityAlerts: true
};

export function validateSettings(values: SettingsFormValues): SettingsFormErrors {
  const errors: SettingsFormErrors = {};

  if (values.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (values.jobTitle.trim().length < 2) {
    errors.jobTitle = "Job title must be at least 2 characters";
  }

  return errors;
}
