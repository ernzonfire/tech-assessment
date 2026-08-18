# Assessment 04 — Full Stack

Time: 4 hours. Normal docs allowed. No AI.

## Brief

Build a small team decision log. A user can create a decision, add options, vote once, close voting, and inspect results.

## Core journey

1. User enters a demo identity or signs in.
2. User creates a decision with 2–5 options and a future deadline.
3. Another user views and votes once.
4. Creator closes the decision.
5. Results show counts/percentages; further votes fail.

## Requirements

- Responsive accessible client with loading/empty/validation/error states.
- API validates all data and enforces creator-only closing.
- Database constraints prevent duplicate votes per user/decision.
- Closing and voting are concurrency-safe.
- Do not trust client-provided ownership or vote totals.
- At least one unit test, two API integration tests, and one documented end-to-end critical journey.
- README includes architecture, schema, API examples, setup, trade-offs, and next steps.

## Suggested endpoints

```text
POST /decisions
GET /decisions
GET /decisions/:id
POST /decisions/:id/votes
POST /decisions/:id/close
```

## Scoring (100)

- End-to-end correctness: 25
- Backend/data integrity/security: 20
- Frontend UX/accessibility: 15
- Code organization/contracts: 15
- Tests and verification: 15
- Communication/trade-offs: 10

## Time-box advice

- 0:00–0:25 clarify, schema, API, thin UI plan
- 0:25–1:50 backend and tests
- 1:50–3:15 frontend core journey
- 3:15–3:40 integration/failure fixes
- 3:40–4:00 README, final verification, notes

## Defense questions

- Show the exact boundary preventing a second vote.
- What race can occur between vote and close?
- What is server-derived versus client-derived?
- What did you deliberately leave out to finish the core journey?

