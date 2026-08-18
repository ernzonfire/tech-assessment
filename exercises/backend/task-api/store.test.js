import test from "node:test";
import assert from "node:assert/strict";
import { createTaskStore } from "./store.js";

const seed = () => [
  { id: "a", title: "Open", completed: false, createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "b", title: "Done", completed: true, createdAt: "2026-01-02T00:00:00.000Z" },
];

test("list returns copies and supports completed filter", () => {
  const store = createTaskStore(seed());
  assert.equal(store.list().length, 2);
  assert.deepEqual(store.list({ completed: true }).map((task) => task.id), ["b"]);
  const result = store.list();
  result[0].title = "mutated outside";
  assert.equal(store.get("a").title, "Open");
});

test("get returns task or null without exposing internal state", () => {
  const store = createTaskStore(seed());
  const task = store.get("a");
  assert.equal(task.title, "Open");
  task.title = "changed";
  assert.equal(store.get("a").title, "Open");
  assert.equal(store.get("missing"), null);
});

test("create trims valid input and generates server fields", () => {
  const store = createTaskStore();
  const task = store.create({ title: "  Learn HTTP  " });
  assert.equal(task.title, "Learn HTTP");
  assert.equal(task.completed, false);
  assert.equal(typeof task.id, "string");
  assert.match(task.createdAt, /^\d{4}-\d{2}-\d{2}T/);
  assert.deepEqual(store.get(task.id), task);
});

test("create rejects invalid titles", () => {
  const store = createTaskStore();
  assert.throws(() => store.create({ title: "  " }), /title/i);
  assert.throws(() => store.create({ title: "x".repeat(121) }), /title/i);
  assert.throws(() => store.create({ title: 42 }), /title/i);
});

test("update changes allowed fields and validates values", () => {
  const store = createTaskStore(seed());
  assert.deepEqual(store.update("a", { title: "  New  ", completed: true }), {
    id: "a",
    title: "New",
    completed: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  });
  assert.equal(store.update("missing", { completed: true }), null);
  assert.throws(() => store.update("a", { completed: "yes" }), /completed/i);
});

test("remove reports whether an item existed", () => {
  const store = createTaskStore(seed());
  assert.equal(store.remove("a"), true);
  assert.equal(store.get("a"), null);
  assert.equal(store.remove("a"), false);
});

