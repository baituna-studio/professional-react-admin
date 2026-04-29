## Context
Current repo defines target architecture in documentation but lacks fully codified setup decisions as an implementation contract.

## Goals / Non-Goals

**Goals:**
- Lock in foundational tooling and project conventions.
- Keep setup lightweight, Vite-only, and easy to extend.

**Non-Goals:**
- Building feature pages or business logic.
- Integrating backend services.

## Decisions
- Use Vite + React + TypeScript strict mode as the only runtime stack.
- Use Tailwind CSS v4 + shared theme tokens in `src/styles/theme.css`.
- Use `@/*` alias for import consistency.
- Keep foundation modular to support feature-first foldering.

## Risks / Trade-offs
- [Risk] Over-designing setup early. -> Mitigation: keep only essentials and defer optional tools.
- [Risk] Token choices may evolve. -> Mitigation: centralize tokens for easy updates.
