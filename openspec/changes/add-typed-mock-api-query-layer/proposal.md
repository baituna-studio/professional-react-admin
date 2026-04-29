## Why
Page development depends on realistic asynchronous data. A typed mock API layer with query integration is needed before implementing feature pages.

## What Changes
- Define typed mock data models for users, KPI, charts, and activity.
- Build mock API functions with artificial delay.
- Standardize TanStack Query usage patterns for data fetching in features.

## Capabilities

### New Capabilities
- `mock-data-query-layer`: Typed mock API and query integration contract.

### Modified Capabilities
- None.

## Impact
- Affects `lib/mock-api`, feature API modules, and query hook integration.
- Improves consistency of loading/error states across pages.
