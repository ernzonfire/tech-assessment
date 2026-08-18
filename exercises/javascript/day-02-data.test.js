import test from "node:test";
import assert from "node:assert/strict";
import {
  chunk,
  groupByStatus,
  indexUsersById,
  makeCounter,
  rankPlayers,
  summarizePaidOrders,
  uniqueValues,
} from "./day-02-data.js";

test("uniqueValues preserves first-seen order", () => {
  assert.deepEqual(uniqueValues([2, 1, 2, NaN, NaN, 3, 1]), [2, 1, NaN, 3]);
  assert.deepEqual(uniqueValues([]), []);
});

test("rankPlayers sorts a copy with deterministic ties", () => {
  const players = [
    { name: "Zed", score: 8 },
    { name: "Ana", score: 10 },
    { name: "Ben", score: 10 },
  ];
  const result = rankPlayers(players);
  assert.deepEqual(result.map((player) => player.name), ["Ana", "Ben", "Zed"]);
  assert.notEqual(result, players);
  assert.equal(players[0].name, "Zed");
});

test("groupByStatus handles normal and unknown statuses", () => {
  const items = [
    { id: 1, status: "open" },
    { id: 2, status: "done" },
    { id: 3, status: "open" },
    { id: 4 },
    { id: 5, status: "  " },
  ];
  const grouped = groupByStatus(items);
  assert.deepEqual(grouped.open.map((item) => item.id), [1, 3]);
  assert.deepEqual(grouped.done.map((item) => item.id), [2]);
  assert.deepEqual(grouped.unknown.map((item) => item.id), [4, 5]);
});

test("summarizePaidOrders calculates paid totals", () => {
  const orders = [
    { status: "paid", items: [{ price: 20, quantity: 2 }, { price: 5, quantity: 1 }] },
    { status: "cancelled", items: [{ price: 999, quantity: 1 }] },
    { status: "paid", items: [{ price: 10, quantity: 3 }] },
  ];
  assert.deepEqual(summarizePaidOrders(orders), {
    paidOrders: 2,
    units: 6,
    revenue: 75,
  });
  assert.deepEqual(summarizePaidOrders([]), { paidOrders: 0, units: 0, revenue: 0 });
});

test("makeCounter keeps independent private state", () => {
  const byTwo = makeCounter(10, 2);
  const normal = makeCounter();
  assert.equal(byTwo(), 12);
  assert.equal(byTwo(), 14);
  assert.equal(normal(), 1);
  assert.equal(normal(), 2);
});

test("indexUsersById skips missing ids and lets later duplicates win", () => {
  const users = [
    { id: "a", name: "First" },
    { id: null, name: "Skip" },
    { id: "b", name: "Bee" },
    { id: "a", name: "Latest" },
  ];
  assert.deepEqual(indexUsersById(users), {
    a: { id: "a", name: "Latest" },
    b: { id: "b", name: "Bee" },
  });
});

test("chunk partitions input and validates size", () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(chunk([], 3), []);
  assert.deepEqual(chunk(null, 2), []);
  assert.throws(() => chunk([1], 0), RangeError);
  assert.throws(() => chunk([1], 1.5), RangeError);
});

