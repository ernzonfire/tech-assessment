# Assessment 01 — JavaScript Core

Time: 75 minutes. Node docs allowed. No AI.

Create `submission/assessment-01.js` exporting the requested functions, plus `submission/assessment-01.test.js` with your own tests.

## Part A — Normalize transactions (35 points)

Implement `normalizeTransactions(records)`.

Input may not be an array; in that case return `[]`. Each valid record has:

```js
{ id, customerId, amount, currency, status, createdAt }
```

Rules:

- Keep only object records with a non-empty string `id` and `customerId`.
- `amount` may be a finite number or numeric string; normalize it to a number and reject negatives.
- Normalize `currency` to uppercase; allow `PHP`, `USD`, and `EUR` only.
- Allow statuses `paid`, `pending`, and `refunded` only.
- `createdAt` must represent a valid date; output ISO format.
- Duplicate ids: keep the last valid occurrence.
- Return a new array sorted newest first; do not mutate input.

## Part B — Customer summary (30 points)

Implement `summarizeCustomers(transactions)` using normalized input.

Return an array like:

```js
[
  {
    customerId: "c1",
    paidCount: 2,
    paidByCurrency: { PHP: 1200, USD: 10 },
    refundedCount: 1,
    latestAt: "2026-08-14T...Z"
  }
]
```

Sort by total number of transactions descending, then `customerId` ascending. Do not convert currencies.

## Part C — Async enrichment (25 points)

Implement `enrichCustomers(summaries, loadCustomer, concurrency = 3)`.

- `loadCustomer(customerId)` returns a promise for `{ name, tier }`.
- Return summaries with `name` and `tier`, preserving input order.
- Never run more than `concurrency` loads at once.
- A failed load should produce `name: "Unknown"`, `tier: null`, and `loadError` containing the error message; other items continue.
- Throw `RangeError` unless concurrency is a positive integer.

## Part D — Explain (10 points)

In `submission/assessment-01-notes.md`, answer briefly:

1. What is the time/space complexity of Parts A and B?
2. Where could mutation accidentally leak?
3. Why does Part C need a concurrency limit?
4. Which edge case consumed the most time?

