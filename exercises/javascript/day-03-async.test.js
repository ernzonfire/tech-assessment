import test from "node:test";
import assert from "node:assert/strict";
import {
  delay,
  fetchJson,
  loadDashboard,
  retry,
  settleTasks,
} from "./day-03-async.js";

test("delay fulfills with the provided value", async () => {
  const started = Date.now();
  assert.equal(await delay(10, "ready"), "ready");
  assert.ok(Date.now() - started >= 7);
});

test("fetchJson parses successful responses", async () => {
  const fakeFetch = async (url) => ({
    ok: true,
    status: 200,
    json: async () => ({ url, id: 7 }),
  });
  assert.deepEqual(await fetchJson("/users/7", fakeFetch), { url: "/users/7", id: 7 });
});

test("fetchJson throws a useful HTTP error", async () => {
  const fakeFetch = async () => ({ ok: false, status: 404 });
  await assert.rejects(() => fetchJson("/missing", fakeFetch), /HTTP 404/);
});

test("loadDashboard starts independent loaders in parallel", async () => {
  const events = [];
  const loadUser = async () => {
    events.push("user:start");
    await new Promise((resolve) => setTimeout(resolve, 15));
    events.push("user:end");
    return { id: 1 };
  };
  const loadTasks = async () => {
    events.push("tasks:start");
    await new Promise((resolve) => setTimeout(resolve, 5));
    events.push("tasks:end");
    return [{ id: 9 }];
  };

  assert.deepEqual(await loadDashboard(loadUser, loadTasks), {
    user: { id: 1 },
    tasks: [{ id: 9 }],
  });
  assert.deepEqual(events.slice(0, 2), ["user:start", "tasks:start"]);
});

test("retry returns after a later success", async () => {
  let calls = 0;
  const operation = async () => {
    calls += 1;
    if (calls < 3) throw new Error(`failure ${calls}`);
    return "ok";
  };
  assert.equal(await retry(operation, 3), "ok");
  assert.equal(calls, 3);
});

test("retry throws the last failure and validates maxAttempts", async () => {
  let calls = 0;
  const operation = async () => {
    calls += 1;
    throw new Error(`failure ${calls}`);
  };
  await assert.rejects(() => retry(operation, 2), /failure 2/);
  assert.equal(calls, 2);
  await assert.rejects(() => retry(operation, 0), RangeError);
});

test("settleTasks reports every outcome in input order", async () => {
  const error = new Error("nope");
  const tasks = [
    async () => "one",
    async () => { throw error; },
    async () => "three",
  ];
  assert.deepEqual(await settleTasks(tasks), [
    { status: "fulfilled", value: "one" },
    { status: "rejected", reason: error },
    { status: "fulfilled", value: "three" },
  ]);
});

