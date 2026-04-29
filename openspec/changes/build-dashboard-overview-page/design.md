## Context
The dashboard page must look production-ready while remaining simple to customize. It is a major milestone for perceived quality.

## Goals / Non-Goals

**Goals:**
- Deliver complete dashboard overview blocks from architecture doc.
- Use shared components and query-based data rendering.

**Non-Goals:**
- Advanced analytics drill-down interactions.
- Real-time websocket updates.

## Decisions
- Structure dashboard into composable sections: header, KPI grid, charts, activity, callout.
- Reuse shared cards and chart wrappers to maintain visual consistency.
- Prioritize responsive stacking order based on documentation layout.

## Risks / Trade-offs
- [Risk] Visual clutter from too many widgets. -> Mitigation: enforce spacing and restrained color use.
- [Risk] Chart readability issues on small screens. -> Mitigation: responsive containers and simplified legends.
