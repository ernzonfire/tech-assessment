# Backend Project — Task API

Build a REST-style JSON API using Node's built-in HTTP server first. This keeps the HTTP mechanics visible before a framework abstracts them.

## Run

```bash
node exercises/backend/task-api/server.js
```

Then call `http://localhost:3000/health`.

## Required endpoints

| Method | Path | Expected result |
|---|---|---|
| GET | `/health` | `200 { "status": "ok" }` |
| GET | `/tasks` | 200 list, optionally filter `?completed=true` |
| GET | `/tasks/:id` | 200 task or 404 |
| POST | `/tasks` | validate JSON title, 201 with created task |
| PATCH | `/tasks/:id` | update title/completed, 200 or 404 |
| DELETE | `/tasks/:id` | 204 or 404 |

## Contract

A task has `id`, `title`, `completed`, and `createdAt`. Trim titles; title must be 1–120 characters. Reject invalid JSON and fields with 400 errors. All non-204 responses are JSON.

Use this error shape:

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "title is required" } }
```

## Milestones

1. Make all `store.test.js` tests green.
2. Implement JSON body parsing with a size limit and helpful 400/413 errors.
3. Add routes one at a time and test with curl/API client.
4. Extract validation and keep handlers small.
5. Add route integration tests.
6. Add request IDs, timing logs, and a final error boundary.

## Stretch goals

- Pagination with `limit` and `cursor`.
- Persistence in SQLite/Postgres.
- Optimistic concurrency/version field.
- Authentication and per-user task authorization.

