import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateTotal,
  classifyNumber,
  countWords,
  findLargest,
  greet,
  isEven,
  sumEvenNumbers,
  toggleUserActive,
} from "./day-01-foundations.js";

test("greet formats names and handles invalid input", () => {
  assert.equal(greet("  Ernie  "), "Hello, Ernie!");
  assert.equal(greet(""), "Hello, Guest!");
  assert.equal(greet(null), "Hello, Guest!");
});

test("isEven accepts only finite even numbers", () => {
  assert.equal(isEven(4), true);
  assert.equal(isEven(-2), true);
  assert.equal(isEven(3), false);
  assert.equal(isEven("4"), false);
  assert.equal(isEven(Infinity), false);
});

test("classifyNumber handles boundaries and invalid values", () => {
  assert.equal(classifyNumber(-0.5), "negative");
  assert.equal(classifyNumber(0), "zero");
  assert.equal(classifyNumber(12), "positive");
  assert.equal(classifyNumber("12"), "invalid");
  assert.equal(classifyNumber(NaN), "invalid");
});

test("calculateTotal applies discount and validates inputs", () => {
  assert.equal(calculateTotal(100, 2, 10), 180);
  assert.equal(calculateTotal(49.5, 0), 0);
  assert.equal(calculateTotal(10, 3), 30);
  assert.equal(calculateTotal(-1, 2), null);
  assert.equal(calculateTotal(10, 2, 101), null);
  assert.equal(calculateTotal("10", 2), null);
});

test("sumEvenNumbers ignores invalid and odd values", () => {
  assert.equal(sumEvenNumbers([1, 2, 4, 7, -2, "8", NaN]), 4);
  assert.equal(sumEvenNumbers([]), 0);
  assert.equal(sumEvenNumbers(null), 0);
});

test("findLargest returns the largest finite number without mutation", () => {
  const values = [3, 99, -5, "100", Infinity, 42];
  const snapshot = [...values];
  assert.equal(findLargest(values), 99);
  assert.deepEqual(values, snapshot);
  assert.equal(findLargest(["5", NaN]), null);
  assert.equal(findLargest(null), null);
});

test("countWords handles varied whitespace", () => {
  assert.equal(countWords("  grind   from\n scratch "), 3);
  assert.equal(countWords("one"), 1);
  assert.equal(countWords("   "), 0);
  assert.equal(countWords(123), 0);
});

test("toggleUserActive returns a new object", () => {
  const original = { id: 1, name: "Kai", active: false };
  const result = toggleUserActive(original);
  assert.deepEqual(result, { id: 1, name: "Kai", active: true });
  assert.notEqual(result, original);
  assert.equal(original.active, false);
  assert.equal(toggleUserActive(null), null);
  assert.equal(toggleUserActive([]), null);
});

