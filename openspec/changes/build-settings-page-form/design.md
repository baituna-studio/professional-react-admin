## Context
The architecture explicitly requires React Hook Form + Zod in settings. This page is also a template showcase for form quality and micro-interactions.

## Goals / Non-Goals

**Goals:**
- Provide validated profile settings workflow with predictable form state.
- Add appearance and notifications sections with save feedback.

**Non-Goals:**
- Persisting settings to real backend services.
- Multi-account preference synchronization.

## Decisions
- Keep schema and form logic colocated in settings feature module.
- Use controlled defaults and typed form values.
- Show toast notifications for save success and actionable errors.

## Risks / Trade-offs
- [Risk] Form complexity grows with future fields. -> Mitigation: keep schema modular and sectioned.
- [Risk] Ambiguous save semantics in mock mode. -> Mitigation: explicit messaging that save is simulated.
