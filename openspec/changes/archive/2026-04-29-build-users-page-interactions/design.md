## Context
The users page needs to be realistic enough for template buyers while staying mock-only. Interaction quality is more important than full CRUD completeness.

## Goals / Non-Goals

**Goals:**
- Deliver searchable and filterable users table with pagination.
- Provide row actions and detail inspection via drawer/modal.

**Non-Goals:**
- Persisting create/edit/delete actions to a backend.
- Implementing enterprise permission matrices.

## Decisions
- Keep filtering and pagination simple and deterministic with mock dataset.
- Use status badges and row menus for common admin affordances.
- Open detail panel from row click or action trigger.

## Risks / Trade-offs
- [Risk] Table complexity grows quickly. -> Mitigation: keep MVP actions focused and mock-safe.
- [Risk] Detail panel state conflicts with filter updates. -> Mitigation: reset selected item when unavailable.
