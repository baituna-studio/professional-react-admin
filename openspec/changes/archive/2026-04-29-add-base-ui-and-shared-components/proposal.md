## Why
Feature pages will be slow and inconsistent without a reusable component layer. We need a shared UI baseline to keep implementation fast and visually coherent.

## What Changes
- Introduce reusable base UI components aligned with shadcn/Radix patterns.
- Add shared admin components such as page header, stat card, chart card, and status badge.
- Define basic loading, empty, and confirmation interaction components.

## Capabilities

### New Capabilities
- `ui-component-system`: Reusable base and shared components for admin pages.

### Modified Capabilities
- None.

## Impact
- Affects `src/components/ui` and `src/components/shared` architecture.
- Reduces duplication across dashboard, users, analytics, and settings pages.
