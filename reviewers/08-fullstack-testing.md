# 08 — Full-Stack Integration, Testing, and Delivery

## Contract-first thinking

Frontend and backend agree on request/response shapes, status codes, auth behavior, pagination, validation errors, and versioning. Write example payloads before wiring both sides.

## A practical testing pyramid

- Many fast unit tests for business rules.
- Focused integration tests for routes, database, and component behavior.
- A few end-to-end tests for critical user journeys.

Test outcomes, not internal implementation. A strong full-stack happy-path test might cover: user signs in → creates item → sees it in list → reloads → item persists.

## Git workflow

- Small coherent commits.
- Clear commit messages that explain intent.
- Branch/PR contains one reviewable concern.
- Never commit secrets or generated noise.
- PR description includes what changed, how verified, screenshots/API examples, and known trade-offs.

## Configuration and delivery

- Keep environment-specific values in validated environment variables.
- Run lint/typecheck/tests/build before deployment.
- Migrations should be compatible with rollout order when possible.
- Add health checks, structured logs, error reporting, and basic performance signals.
- Have a rollback or forward-fix plan.

## System-design conversation template

1. Clarify users, volume, core actions, and constraints.
2. Define the minimal product and data model.
3. Sketch client, API, database, and external services.
4. Walk one important request end to end.
5. Identify failure modes, security, and observability.
6. Discuss the first scaling bottleneck—not imaginary infinite scale.

## Definition of done for the capstone

- Core journey works end to end.
- Empty/loading/error/validation states exist.
- Important authorization is server-enforced.
- Data persists with sensible constraints.
- Core business rules have tests.
- README explains setup, architecture, API, trade-offs, and next steps.
- You can demo and defend it in 10 minutes.

