# 07 — Databases, Auth, and Security

## Relational modeling

Represent entities in tables, relationships with foreign keys, and invariants with constraints.

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE tasks (
  id BIGINT PRIMARY KEY,
  owner_id BIGINT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE
);
```

Use joins to combine related rows. Use transactions when multiple writes must succeed or fail together. Index columns used frequently for filtering/joining, but remember indexes cost storage and write work.

Parameterized queries prevent SQL injection:

```js
db.query("SELECT * FROM users WHERE email = $1", [email]);
```

## Authentication vs authorization

- Authentication: who are you?
- Authorization: are you allowed to do this?

Hash passwords with a purpose-built password hashing algorithm; never encrypt or store plain passwords. Sessions and JWTs are mechanisms with trade-offs, not authorization by themselves. Re-check resource ownership on the server.

## Minimum web-security checklist

- Prevent injection with parameterization and validation.
- Prevent XSS with safe output encoding and careful HTML insertion.
- Protect cookie-authenticated writes from CSRF.
- Set secure cookie attributes where applicable.
- Use least privilege for users, services, and database roles.
- Rate-limit sensitive endpoints.
- Keep secrets out of Git, frontend bundles, and logs.
- Avoid detailed authentication errors that enable account discovery.
- Keep dependencies patched and review risky packages.

## Data questions interviewers ask

- Why SQL or NoSQL for this feature?
- What enforces uniqueness?
- What happens under two simultaneous updates?
- Which query is slow, and what evidence supports the index?
- How are migrations deployed and rolled back?
- How is user data deleted or retained?

