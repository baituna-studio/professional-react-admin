## ADDED Requirements

### Requirement: Settings form MUST use schema-based validation
The system MUST validate profile settings inputs using Zod-integrated form handling.

#### Scenario: Invalid profile input
- **WHEN** a user submits settings with invalid field values
- **THEN** validation errors are shown and submission is blocked

### Requirement: Settings save MUST provide user feedback
The system MUST show toast feedback after settings save actions.

#### Scenario: Successful settings save
- **WHEN** a user submits valid settings
- **THEN** the UI shows a success toast confirming the update
