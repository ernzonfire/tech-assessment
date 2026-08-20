/**
 * DEBUGGING LAB
 *
 * Every starter already contains an implementation with one intentional bug.
 * The learner should run the tests first, read the evidence, and make the
 * smallest change that makes every case pass.
 */
export const debuggingChallenges = [
  {
    id: "debug-syntax-discount",
    title: "Repair the Syntax Error",
    rank: "8 kyu",
    category: "Debugging · Syntax",
    drill: { label: "Debugging Lab", step: 1, total: 10 },
    points: 10,
    concept: "syntax error · parser message · parentheses",
    description: "This discount function cannot run yet. Run it before editing, use the parser message to locate the problem, then repair only the broken syntax.",
    requirements: [
      "Run the starter code first and read the exact error message.",
      "Return the price after applying `discountPercent`.",
      "Make the smallest syntax change possible; do not rewrite the function.",
    ],
    examples: [
      { input: "applyDiscount(100, 20)", output: "80" },
      { input: "applyDiscount(50, 0)", output: "50" },
    ],
    functionName: "applyDiscount",
    starter: `function applyDiscount(price, discountPercent) {
  const multiplier = 1 - (discountPercent / 100;
  return price * multiplier;
}
`,
    hints: [
      "Do not guess yet. What character does the parser say it expected?",
      "Count the opening and closing parentheses on the multiplier line.",
      "Only one closing parenthesis is missing.",
    ],
    tests: [
      { label: "applies a percentage discount", args: [100, 20], expected: 80 },
      { label: "keeps the price at zero discount", args: [50, 0], expected: 50 },
      { label: "handles a decimal price", args: [19.5, 10], expected: 17.55, hidden: true },
    ],
  },
  {
    id: "debug-runtime-name",
    title: "Stop the Runtime Crash",
    rank: "8 kyu",
    category: "Debugging · Runtime",
    drill: { label: "Debugging Lab", step: 2, total: 10 },
    points: 15,
    concept: "runtime error · guard clause · type checking",
    description: "The happy path works, but missing user data crashes the function. Reproduce the crash and protect the first unsafe operation.",
    requirements: [
      "Return a trimmed name when `user.name` is a non-blank string.",
      "Return `Guest` for null, missing, blank, or non-string names.",
      "Keep the successful path working while preventing the runtime error.",
    ],
    examples: [
      { input: 'displayName({ name: "  Ana  " })', output: '"Ana"' },
      { input: "displayName(null)", output: '"Guest"' },
    ],
    functionName: "displayName",
    starter: `function displayName(user) {
  const name = user.name.trim();
  return name || "Guest";
}
`,
    hints: [
      "Which exact expression runs before the fallback can be reached?",
      "A fallback after `.trim()` cannot protect `.trim()` from an invalid receiver.",
      "Guard that `user` exists and `user.name` is a string before trimming it.",
    ],
    tests: [
      { label: "trims a valid name", args: [{ name: "  Ana  " }], expected: "Ana" },
      { label: "blank name becomes Guest", args: [{ name: "   " }], expected: "Guest" },
      { label: "null user becomes Guest", args: [null], expected: "Guest" },
      { label: "missing name becomes Guest", args: [{}], expected: "Guest", hidden: true },
      { label: "non-string name becomes Guest", args: [{ name: 42 }], expected: "Guest", hidden: true },
    ],
  },
  {
    id: "debug-role-condition",
    title: "Fix the Impossible Condition",
    rank: "8 kyu",
    category: "Debugging · Logic",
    drill: { label: "Debugging Lab", step: 3, total: 10 },
    points: 15,
    concept: "boolean logic · && · || · condition tracing",
    description: "Active admins and editors should have access, but the current condition rejects everyone. Trace each boolean part and change the wrong operator.",
    requirements: [
      "Return true for an active `admin` or active `editor`.",
      "Return false for inactive users and all other roles.",
      "Change the faulty boolean expression instead of adding special-case returns.",
    ],
    examples: [
      { input: 'canAccess("admin", true)', output: "true" },
      { input: 'canAccess("viewer", true)', output: "false" },
    ],
    functionName: "canAccess",
    starter: `function canAccess(role, isActive) {
  if ((role === "admin" && role === "editor") && isActive) {
    return true;
  }

  return false;
}
`,
    hints: [
      "Write the value of both role comparisons when role is `admin`.",
      "Can one string equal `admin` and `editor` at the same time?",
      "The two allowed roles need `||`; activity still needs `&&`.",
    ],
    tests: [
      { label: "active admin is allowed", args: ["admin", true], expected: true },
      { label: "active editor is allowed", args: ["editor", true], expected: true },
      { label: "active viewer is denied", args: ["viewer", true], expected: false },
      { label: "inactive admin is denied", args: ["admin", false], expected: false, hidden: true },
    ],
  },
  {
    id: "debug-loop-boundary",
    title: "Find the Off-by-One Bug",
    rank: "8 kyu",
    category: "Debugging · Loop",
    drill: { label: "Debugging Lab", step: 4, total: 10 },
    points: 15,
    concept: "for loop · boundary · off-by-one",
    description: "The loop almost calculates the right total, but one boundary value is skipped. Trace the final iteration for a small input.",
    requirements: [
      "Return the sum of every integer from 1 through `limit`, inclusive.",
      "Return 0 unless `limit` is a positive integer.",
      "Fix the loop boundary without replacing the loop with a formula.",
    ],
    examples: [
      { input: "sumThrough(3)", output: "6" },
      { input: "sumThrough(1)", output: "1" },
    ],
    functionName: "sumThrough",
    starter: `function sumThrough(limit) {
  if (!Number.isInteger(limit) || limit < 1) return 0;

  let total = 0;
  for (let number = 1; number < limit; number += 1) {
    total += number;
  }
  return total;
}
`,
    hints: [
      "For `limit = 3`, list the values that `number` actually takes.",
      "The word `inclusive` tells you whether the final value should run.",
      "Compare `< limit` with `<= limit`.",
    ],
    tests: [
      { label: "includes the upper boundary", args: [3], expected: 6 },
      { label: "handles the smallest valid limit", args: [1], expected: 1 },
      { label: "sums a larger range", args: [10], expected: 55 },
      { label: "rejects zero", args: [0], expected: 0, hidden: true },
    ],
  },
  {
    id: "debug-early-return",
    title: "Move the Early Return",
    rank: "7 kyu",
    category: "Debugging · Control Flow",
    drill: { label: "Debugging Lab", step: 5, total: 10 },
    points: 20,
    concept: "loop · early return · control flow tracing",
    description: "The search stops after checking only one usable item. Follow the return path and let the loop inspect the rest of the array.",
    requirements: [
      "Return the first string whose length is at least `minLength`.",
      "Skip non-string items and return null when nothing matches.",
      "Remove or relocate the statement that ends the search too soon.",
    ],
    examples: [
      { input: 'findFirstLongWord(["cat", "tiger"], 5)', output: '"tiger"' },
      { input: 'findFirstLongWord(["cat", "dog"], 5)', output: "null" },
    ],
    functionName: "findFirstLongWord",
    starter: `function findFirstLongWord(words, minLength) {
  if (!Array.isArray(words)) return null;

  for (const word of words) {
    if (typeof word !== "string") continue;
    if (word.length >= minLength) return word;
    return null;
  }

  return null;
}
`,
    hints: [
      "Trace `['cat', 'tiger']` one statement at a time.",
      "Which return executes immediately after `cat` fails the length check?",
      "The function should return null only after the whole loop finds no match.",
    ],
    tests: [
      { label: "finds a match after a short word", args: [["cat", "tiger"], 5], expected: "tiger" },
      { label: "returns the first matching word", args: [["elephant", "giraffe"], 5], expected: "elephant" },
      { label: "returns null without a match", args: [["cat", "dog"], 5], expected: null },
      { label: "skips non-string values", args: [[42, "planet"], 5], expected: "planet", hidden: true },
    ],
  },
  {
    id: "debug-array-mutation",
    title: "Protect the Original Array",
    rank: "7 kyu",
    category: "Debugging · Mutation",
    drill: { label: "Debugging Lab", step: 6, total: 10 },
    points: 20,
    concept: "array mutation · sort · spread copy",
    description: "The returned scores look correct, but a hidden side effect changes the caller's array. Identify the mutating method and copy before using it.",
    requirements: [
      "Return scores sorted from highest to lowest.",
      "Return a new array and leave the input in its original order.",
      "Keep the comparator; fix only the unintended mutation.",
    ],
    examples: [
      { input: "sortScores([40, 90, 70])", output: "[90, 70, 40]" },
    ],
    functionName: "sortScores",
    starter: `function sortScores(scores) {
  if (!Array.isArray(scores)) return [];
  return scores.sort((left, right) => right - left);
}
`,
    hints: [
      "A correct return value does not prove that the function has no side effects.",
      "Check whether `.sort()` changes the array it is called on.",
      "Call `.sort()` on a copied array, for example one made with spread syntax.",
    ],
    tests: [
      { label: "sorts descending", args: [[40, 90, 70]], expected: [90, 70, 40], noMutation: true },
      { label: "handles duplicate scores", args: [[10, 30, 10]], expected: [30, 10, 10], noMutation: true },
      { label: "handles an empty array", args: [[]], expected: [], noMutation: true },
      { label: "rejects non-array input", args: [null], expected: [], hidden: true },
    ],
  },
  {
    id: "debug-reduce-total",
    title: "Repair the Reduce Callback",
    rank: "7 kyu",
    category: "Debugging · Data",
    drill: { label: "Debugging Lab", step: 7, total: 10 },
    points: 20,
    concept: "reduce · callback return · accumulator",
    description: "The reducer calculates an expression but loses the next accumulator. Inspect what the callback actually returns on every iteration.",
    requirements: [
      "Return the sum of `price * quantity` for all cart items.",
      "Return 0 for an empty or non-array input.",
      "Repair the callback while keeping `.reduce()`.",
    ],
    examples: [
      { input: "cartTotal([{ price: 10, quantity: 2 }])", output: "20" },
      { input: "cartTotal([])", output: "0" },
    ],
    functionName: "cartTotal",
    starter: `function cartTotal(items) {
  if (!Array.isArray(items)) return 0;

  return items.reduce((total, item) => {
    total + item.price * item.quantity;
  }, 0);
}
`,
    hints: [
      "Log or mentally trace the callback's returned value after the first item.",
      "Braces in an arrow callback require an explicit `return`.",
      "Return `total + item.price * item.quantity` from the callback.",
    ],
    tests: [
      { label: "totals one item", args: [[{ price: 10, quantity: 2 }]], expected: 20 },
      { label: "accumulates multiple items", args: [[{ price: 10, quantity: 2 }, { price: 5, quantity: 3 }]], expected: 35 },
      { label: "empty cart is zero", args: [[]], expected: 0 },
      { label: "non-array cart is zero", args: [null], expected: 0, hidden: true },
    ],
  },
  {
    id: "debug-missing-await",
    title: "Wait for the Value",
    rank: "7 kyu",
    category: "Debugging · Async",
    drill: { label: "Debugging Lab", step: 8, total: 10 },
    points: 25,
    concept: "async · Promise · await · runtime type",
    description: "A Promise is being treated like the resolved string it will eventually contain. Inspect the runtime type and wait at the correct line.",
    requirements: [
      "Return a trimmed, lowercase username.",
      "Return `guest` for blank or non-string input.",
      "Keep the function async and resolve the Promise before using the string method.",
    ],
    examples: [
      { input: 'normalizeUsername("  ANA  ")', output: 'Promise → "ana"' },
      { input: "normalizeUsername(null)", output: 'Promise → "guest"' },
    ],
    functionName: "normalizeUsername",
    starter: `async function normalizeUsername(name) {
  if (typeof name !== "string" || !name.trim()) return "guest";

  const cleanName = Promise.resolve(name.trim());
  return cleanName.toLowerCase();
}
`,
    hints: [
      "What value type does `Promise.resolve(...)` return immediately?",
      "`.toLowerCase()` belongs to strings, not Promise objects.",
      "Add `await` where `cleanName` is assigned, or before the method call.",
    ],
    tests: [
      { label: "normalizes uppercase input", args: ["  ANA  "], expected: "ana" },
      { label: "keeps a lowercase username", args: ["ernie"], expected: "ernie" },
      { label: "blank input becomes guest", args: ["   "], expected: "guest" },
      { label: "non-string input becomes guest", args: [null], expected: "guest", hidden: true },
    ],
  },
  {
    id: "debug-block-scope",
    title: "Fix the Scope Error",
    rank: "7 kyu",
    category: "Debugging · Scope",
    drill: { label: "Debugging Lab", step: 9, total: 10 },
    points: 25,
    concept: "block scope · try / catch · ReferenceError",
    description: "Valid JSON is parsed successfully, then a variable disappears before it is returned. Trace the variable's block scope and return it where it exists.",
    requirements: [
      "Return the parsed value for valid JSON text.",
      "Return null when parsing throws.",
      "Keep the `try / catch` and fix the scope-related runtime error.",
    ],
    examples: [
      { input: 'parseSettings("{\\"theme\\":\\"dark\\"}")', output: '{ theme: "dark" }' },
      { input: 'parseSettings("not json")', output: "null" },
    ],
    functionName: "parseSettings",
    starter: `function parseSettings(jsonText) {
  try {
    const settings = JSON.parse(jsonText);
  } catch {
    return null;
  }

  return settings;
}
`,
    hints: [
      "The parse succeeds, so why does `return settings` still throw?",
      "A `const` declared inside the try block exists only inside that block.",
      "Return `settings` inside the try block after parsing it.",
    ],
    tests: [
      { label: "parses an object", args: ['{"theme":"dark"}'], expected: { theme: "dark" } },
      { label: "parses an array", args: ["[1,2,3]"], expected: [1, 2, 3] },
      { label: "invalid JSON becomes null", args: ["not json"], expected: null },
      { label: "parses a JSON primitive", args: ["true"], expected: true, hidden: true },
    ],
  },
  {
    id: "debug-falsy-index",
    title: "Rescue Index Zero",
    rank: "6 kyu",
    category: "Debugging · Falsy Values",
    drill: { label: "Debugging Lab", step: 10, total: 10 },
    points: 30,
    concept: "findIndex · zero · falsy · fallback",
    description: "Search works for later positions but fails for the first item. Inspect how the fallback treats the valid numeric value zero.",
    requirements: [
      "Return the index of the task whose `id` matches `targetId`.",
      "Return -1 when no task matches or tasks is not an array.",
      "Preserve a valid result of 0 instead of replacing it with the fallback.",
    ],
    examples: [
      { input: 'findTaskIndex([{ id: "a" }], "a")', output: "0" },
      { input: 'findTaskIndex([{ id: "a" }], "missing")', output: "-1" },
    ],
    functionName: "findTaskIndex",
    starter: `function findTaskIndex(tasks, targetId) {
  if (!Array.isArray(tasks)) return -1;

  const index = tasks.findIndex((task) => task.id === targetId);
  return index || -1;
}
`,
    hints: [
      "Compare the result when the match is at index 0 versus index 1.",
      "Zero is a valid index, but it is falsy in a boolean context.",
      "`.findIndex()` already returns -1 when nothing matches, so no fallback is needed.",
    ],
    tests: [
      { label: "finds the first task", args: [[{ id: "a" }, { id: "b" }], "a"], expected: 0 },
      { label: "finds a later task", args: [[{ id: "a" }, { id: "b" }], "b"], expected: 1 },
      { label: "missing task returns -1", args: [[{ id: "a" }], "missing"], expected: -1 },
      { label: "non-array input returns -1", args: [null, "a"], expected: -1, hidden: true },
    ],
  },
];
