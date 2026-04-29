# mock-data-query-layer Specification

## Purpose
TBD - created by archiving change add-typed-mock-api-query-layer. Update Purpose after archive.
## Requirements
### Requirement: Mock APIs MUST be typed and asynchronous
The system MUST expose typed async functions for dashboard and users domain data.

#### Scenario: Query function type safety
- **WHEN** a feature consumes a mock API function
- **THEN** function input and output are strongly typed in TypeScript

### Requirement: Mock APIs MUST simulate loading latency
The system MUST include artificial delay in mock API calls to validate loading states.

#### Scenario: Visible loading state in page query
- **WHEN** a page triggers a mock API request
- **THEN** there is measurable delay before success response resolves

