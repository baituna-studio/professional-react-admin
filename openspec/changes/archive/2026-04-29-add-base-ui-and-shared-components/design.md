## Context
The product target is premium and reusable. Building pages first without component contracts risks duplicated markup and inconsistent behavior.

## Goals / Non-Goals

**Goals:**
- Establish a reusable UI component system with accessible defaults.
- Provide shared display states (loading, empty, confirm) used across features.

**Non-Goals:**
- Implementing full page business logic.
- Introducing large third-party UI frameworks beyond planned stack.

## Decisions
- Place primitive components in `components/ui` and composition components in `components/shared`.
- Keep component APIs simple with `className` extension and typed props.
- Enforce shared status and layout patterns through reusable components.

## Risks / Trade-offs
- [Risk] Too many abstractions early. -> Mitigation: only abstract repeated patterns.
- [Risk] Style drift between components. -> Mitigation: reuse shared tokens and variants.
