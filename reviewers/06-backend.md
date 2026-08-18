# 06 — Node.js and Backend APIs

## Request lifecycle

An HTTP server receives a request, identifies a route, authenticates/authorizes, parses and validates input, performs business/data work, then returns a consistent response. Logging and error handling surround the lifecycle.

Keep layers understandable:

```text
route/controller -> service/use case -> repository/data source
```

Small apps do not need ceremony, but avoid mixing every concern in one handler.

## REST-style design

```text
GET    /tasks       list
GET    /tasks/:id   retrieve
POST   /tasks       create
PATCH  /tasks/:id   partial update
DELETE /tasks/:id   delete
```

Validate at the boundary. Reject malformed input with actionable 4xx responses. Do not leak stack traces or secrets.

Example error shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "title is required",
    "details": { "field": "title" }
  }
}
```

## Backend fundamentals

- Separate configuration from code using environment variables.
- Use timeouts and handle dependency failures.
- Log request/correlation IDs and useful context, not passwords/tokens.
- Pagination prevents unbounded list responses.
- Idempotency matters for retries and duplicate requests.
- Never trust client input, even if frontend validation exists.

## Testing layers

- Unit: one function/service with dependencies controlled.
- Integration: route plus database or meaningful boundaries.
- End-to-end: real user journey through the deployed-like system.

Prioritize behavior and contracts over implementation details.

Project: `exercises/backend/task-api/`.

