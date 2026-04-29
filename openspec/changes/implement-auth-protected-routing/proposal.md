## Why
The template needs a complete mock authentication flow to simulate real admin usage and guard private routes for demos and starter usage.

## What Changes
- Implement login page with mock credential validation.
- Add protected route checks using token presence in local storage.
- Add authenticated redirects and logout behavior.

## Capabilities

### New Capabilities
- `mock-auth-routing`: Mock authentication flow with protected client routes.

### Modified Capabilities
- None.

## Impact
- Affects routing, auth feature module, and session handling utilities.
- Enables realistic MVP behavior for private admin pages.
