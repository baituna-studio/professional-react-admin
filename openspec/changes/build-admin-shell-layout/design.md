## Context
The product requires premium first impression and strong usability across desktop and mobile. A responsive shell is a cross-cutting architectural layer.

## Goals / Non-Goals

**Goals:**
- Deliver a reusable authenticated app shell with responsive navigation.
- Keep layout route-aware and easy to extend with additional menu items.

**Non-Goals:**
- Implementing page-specific business data.
- Finalizing notification backend behavior.

## Decisions
- Use `AppLayout` as the primary container for protected routes.
- Split shell into sidebar, mobile sidebar, topbar, and user menu components.
- Use global UI state for sidebar collapse and command/menu toggles.

## Risks / Trade-offs
- [Risk] Complex responsive state interactions. -> Mitigation: centralize UI toggles in one store.
- [Risk] Overcrowded topbar on mobile. -> Mitigation: prioritize controls and collapse secondary items.
