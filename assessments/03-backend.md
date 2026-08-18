# Assessment 03 — Backend

Time: 2.5 hours. Runtime/framework/database docs allowed. No AI.

## Brief

Build a JSON API for support tickets.

Ticket fields: `id`, `title`, `description`, `status`, `priority`, `requesterEmail`, `assigneeId`, `createdAt`, `updatedAt`, `version`.

## Required endpoints

- `POST /tickets`
- `GET /tickets/:id`
- `GET /tickets?status=&priority=&assigneeId=&q=&limit=&cursor=`
- `PATCH /tickets/:id`
- `POST /tickets/:id/assign`

## Rules

- Validate all input. Define allowed status transitions.
- Normalize email and reject malformed email.
- List endpoint is paginated, newest first, with deterministic ordering.
- Assignment is idempotent.
- Use `version` to detect conflicting updates and return 409.
- Consistent JSON errors; no stack traces in responses.
- Repository/data layer can be in-memory, but must be replaceable.
- Concurrent requests must not expose partially updated objects.

## Required tests

- Valid create and invalid create.
- Not found.
- Filtering/pagination.
- Allowed and rejected transition.
- Duplicate assignment.
- Version conflict.
- One unexpected-error case returns sanitized 500.

## Scoring (100)

- Contract/correctness/status codes: 30
- Validation and error handling: 20
- Design/decomposition: 15
- Data consistency/concurrency: 10
- Tests: 15
- Docs/trade-offs: 10

## Defense questions

- What would change when moving to Postgres?
- Where should a transaction begin/end?
- Which indexes support your list queries?
- How would auth and ticket-level authorization fit?

