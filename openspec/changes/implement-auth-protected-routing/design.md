## Context
Authentication behavior is essential for admin templates even in MVP form. The architecture explicitly calls for fake auth with fixed credentials.

## Goals / Non-Goals

**Goals:**
- Deliver predictable mock login and logout flow.
- Enforce protected routing for all dashboard pages.

**Non-Goals:**
- Real backend authentication or refresh token strategy.
- Production-grade security implementation.

## Decisions
- Use local storage token as session indicator.
- Restrict successful login to configured mock credentials.
- Redirect unauthenticated users to `/login` and authenticated users away from `/login`.

## Risks / Trade-offs
- [Risk] Mock flow mistaken as secure auth. -> Mitigation: explicit docs and naming as mock.
- [Risk] Token drift across tabs. -> Mitigation: keep logic simple and deterministic for MVP.
