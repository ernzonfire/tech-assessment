# Capstone — Full-Stack Issue Tracker

Build this only after the frontend and backend checkpoints.

## Scenario

A small software team needs an issue tracker. Users sign in, create projects, file issues, assign them, update status/priority, comment, search, and view a simple project summary.

## Minimum product

- Authentication: register/sign in/sign out.
- Projects: list and create; only members can view a project.
- Issues: create, list, view, update status/priority/assignee.
- Comments: add and display chronologically.
- Filters: status, priority, assignee, text search.
- Dashboard: counts by status and recent activity.
- Responsive and keyboard-accessible UI.
- Loading, empty, validation, authorization, and server-error states.

## Suggested data model

```text
users(id, email, password_hash, created_at)
projects(id, name, owner_id, created_at)
project_members(project_id, user_id, role)
issues(id, project_id, reporter_id, assignee_id, title, description,
       status, priority, created_at, updated_at)
comments(id, issue_id, author_id, body, created_at)
```

Add foreign keys, uniqueness where appropriate, and indexes based on actual query patterns.

## Required engineering artifacts

- README with setup and architecture decisions.
- `.env.example` without real secrets.
- API contract with example requests/responses/errors.
- Database migration/schema.
- Seed data for demo.
- Unit tests for core business rules.
- Integration tests for auth/resource authorization and main issue routes.
- At least one end-to-end critical journey.
- Deployment and a 10-minute demo script.

## Recommended milestones

1. Write user stories, wireframe, API contract, and schema.
2. Implement auth and project membership boundary.
3. Implement issue CRUD and authorization.
4. Build the frontend list/detail/create journey.
5. Add comments, filters, and dashboard.
6. Test failures and security boundaries.
7. Deploy, observe, polish, and rehearse the demo.

## Evaluation (100)

- Correctness and requirements: 25
- Code structure and clarity: 15
- API/data design: 15
- UI/accessibility/responsiveness: 15
- Security and authorization: 10
- Tests and error handling: 10
- Delivery/docs/demo/trade-offs: 10

## Scope discipline

Finish the minimum product before realtime updates, file uploads, notifications, rich text, or complex roles. A complete smaller app scores better than a wide broken one.

