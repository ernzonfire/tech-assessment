# JavaScript to Full-Stack Grind

Kini nga repo kay imong **reviewer + exercise lab + tech-assessment simulator**. Ang explanations kay Bisaya/English para sayon sabton, pero English ang code ug interview terms kay mao kasagarang gamiton sa trabaho.

## Rule sa grind

Ayaw diretso sa assessment. Kada module sundon ni nga loop:

1. **Review** — basaha ang reviewer ug i-type mismo ang examples.
2. **Recall** — isira ang reviewer, unya i-explain aloud ang topic in your own words.
3. **Drill** — solve the exercise without searching for the exact answer.
4. **Verify** — run the tests; debug until green.
5. **Defend** — i-explain nganong mao na imong solution, including complexity/trade-offs.
6. **Assess** — human ra sa module assessment or live Q&A with Codex.

Target: **2–3 focused hours/day, 6 days/week**. Kung 1 hour/day ra, okay gihapon—ayaw lang laktawi ang exercises.

## Start here

Today, do only this:

1. Read [reviewers/01-js-foundations.md](reviewers/01-js-foundations.md).
2. Open [exercises/javascript/day-01-foundations.js](exercises/javascript/day-01-foundations.js) and solve every `TODO`.
3. Run:

   ```bash
   npm run test:day1
   ```

4. Update [PROGRESS.md](PROGRESS.md).
5. Send Codex your test output plus a short explanation of your hardest function. Then we do the Day 1 oral check.

Do **not** open `assessments/` yet. Those are timed, closed-notes simulations.

## Commands

No install is needed for the first three JavaScript modules; they use Node's built-in test runner.

```bash
npm run test:day1
npm run test:day2
npm run test:day3
npm run test:js
npm run check
```

Recommended: Node.js 20 or newer.

## What you will build

- JavaScript utility problems with automated tests
- A responsive vanilla-JS task dashboard
- A REST-style Node.js task API
- A full-stack issue tracker capstone
- Four timed mock assessments: JavaScript, frontend, backend, and full-stack

The complete sequence is in [CURRICULUM.md](CURRICULUM.md). Quick recall material is in [CHEATSHEET.md](CHEATSHEET.md).

## Honest-assessment rules

- Review phase: docs/search/AI are allowed, but understand and retype the code.
- Exercise phase: docs are allowed; ask for hints before asking for a solution.
- Assessment phase: no AI and no copying. Docs are allowed only if the assessment says so.
- If stuck for 20 minutes: write what you know, reduce the problem, inspect one failing case, then ask for **one hint**.

