## ADDED Requirements

### Requirement: Login MUST validate mock credentials
The system MUST authenticate only when the configured mock email and password are provided.

#### Scenario: Invalid credential handling
- **WHEN** a user submits incorrect credentials
- **THEN** login fails and an error message is shown

### Requirement: Protected routes MUST require a session token
The system MUST prevent access to protected routes when no auth token is present.

#### Scenario: Unauthenticated access to dashboard
- **WHEN** a visitor opens a protected route without a token
- **THEN** the app redirects the visitor to `/login`
