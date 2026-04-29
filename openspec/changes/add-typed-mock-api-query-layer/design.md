## Context
The architecture requires no backend for MVP but still needs realistic data workflows. Query-driven async behavior is central to dashboard quality.

## Goals / Non-Goals

**Goals:**
- Provide typed, reusable mock data and API functions.
- Support predictable loading and caching behavior through TanStack Query.

**Non-Goals:**
- Building real network transport or backend endpoints.
- Implementing full cache invalidation policies for production complexity.

## Decisions
- Keep mock data source in TypeScript files under `lib/mock-api`.
- Use async API wrappers with delay utility to simulate latency.
- Keep feature-level query usage close to consuming pages/components.

## Risks / Trade-offs
- [Risk] Mock data not representative enough. -> Mitigation: include realistic fields and sizes.
- [Risk] Query patterns diverge by feature. -> Mitigation: document and reuse common conventions.
