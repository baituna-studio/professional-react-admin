## ADDED Requirements

### Requirement: Protected areas MUST render inside a responsive shell
The system MUST render authenticated routes within a shell that supports desktop sidebar and mobile drawer navigation.

#### Scenario: Mobile navigation access
- **WHEN** an authenticated user opens the app on a small screen
- **THEN** they can open a drawer menu to navigate between primary routes

### Requirement: Navigation MUST reflect current route
The system MUST visually indicate the active navigation item based on the current route.

#### Scenario: Active item highlighting
- **WHEN** a user navigates to a configured route
- **THEN** the corresponding menu item appears in active state
