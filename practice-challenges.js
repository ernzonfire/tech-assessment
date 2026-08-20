import { debuggingChallenges } from "./debugging-challenges.js";
import { arrayFundamentalsChallenges } from "./array-fundamentals-challenges.js";
import { retakeFoundationChallenges } from "./retake-foundation-challenges.js";

export const challenges = [
  ...retakeFoundationChallenges,
  {
    id: "greet-user",
    title: "Greet the User",
    rank: "8 kyu",
    category: "Functions",
    drill: { label: "Function Reps", step: 1, total: 5 },
    points: 10,
    concept: "function · return · string · trim",
    description: "Create a greeting from a user's name. This warms up function inputs, return values, strings, and invalid input handling.",
    requirements: [
      "Return `Hello, <trimmed name>!` for a non-blank string.",
      "Use `Guest` when name is blank or not a string.",
      "Do not print the answer—return it.",
    ],
    examples: [
      { input: 'greet("  Ana  ")', output: '"Hello, Ana!"' },
      { input: 'greet("")', output: '"Hello, Guest!"' },
    ],
    functionName: "greet",
    starter: `function greet(name) {
  // Write your solution here
}
`,
    hints: [
      "Which requirement must be handled before the first operation that assumes the input is a string?",
      "Compare the raw name in the example with the name in the output. What changed?",
      "Trace the normal, blank, and non-string paths separately. Which path is still missing?",
    ],
    tests: [
      { label: "normal name", args: ["Ana"], expected: "Hello, Ana!" },
      { label: "trims whitespace", args: ["  Ernie  "], expected: "Hello, Ernie!" },
      { label: "blank becomes Guest", args: ["   "], expected: "Hello, Guest!" },
      {
        label: "non-string becomes Guest",
        args: [null],
        expected: "Hello, Guest!",
        hidden: true,
        failureHint: "One requirement is not represented by the visible string examples. Re-read what should happen when the input is not a string, then trace the first operation your function performs.",
      },
    ],
  },
  {
    id: "greet-with-title",
    title: "Greet with a Title",
    rank: "8 kyu",
    category: "Functions",
    drill: { label: "Function Reps", step: 2, total: 5 },
    points: 10,
    concept: "function · parameters · return · validation",
    description: "Repeat the greeting pattern with two inputs. Decide which parts belong in the final message before returning it.",
    requirements: [
      "When name and title are non-blank strings, return `Hello, <trimmed title> <trimmed name>!`.",
      "When title is blank or not a string, omit it and return `Hello, <trimmed name>!`.",
      "When name is blank or not a string, return `Hello, Guest!` regardless of title.",
    ],
    examples: [
      { input: 'greetWithTitle("  Ana  ", "  Dr. ")', output: '"Hello, Dr. Ana!"' },
      { input: 'greetWithTitle("Kai", "")', output: '"Hello, Kai!"' },
      { input: 'greetWithTitle("   ", "Dr.")', output: '"Hello, Guest!"' },
    ],
    functionName: "greetWithTitle",
    starter: `function greetWithTitle(name, title) {
  // Write your solution here
}
`,
    hints: [
      "List the possible name states and title states before tracing the branches.",
      "Which requirement makes the title irrelevant? Consider handling that path early.",
      "Check whether every string operation is reached only by an appropriate input.",
    ],
    tests: [
      { label: "trims name and title", args: ["  Ana  ", "  Dr. "], expected: "Hello, Dr. Ana!" },
      { label: "blank title is omitted", args: ["Kai", "   "], expected: "Hello, Kai!" },
      { label: "blank name becomes Guest", args: ["   ", "Dr."], expected: "Hello, Guest!" },
      {
        label: "non-string title is omitted",
        args: ["Mia", null],
        expected: "Hello, Mia!",
        hidden: true,
        failureHint: "One input can be unusable while the other remains valid. Trace each parameter independently before combining them.",
      },
      {
        label: "non-string name becomes Guest",
        args: [null, "Dr."],
        expected: "Hello, Guest!",
        hidden: true,
        failureHint: "One requirement makes the second parameter irrelevant. Check whether that path is decided early enough.",
      },
    ],
  },
  {
    id: "greet-by-time",
    title: "Greet by Time",
    rank: "8 kyu",
    category: "Functions + Conditions",
    drill: { label: "Function Reps", step: 3, total: 5 },
    points: 15,
    concept: "function · if / else · boundaries · return",
    description: "Use the same greeting idea with an hour that selects the message. This rep focuses on ordered conditions and exact boundaries.",
    requirements: [
      "Return `Invalid time` unless hour is a finite number from 0 through 23.",
      "Hours 5–11 use `Good morning`, 12–17 use `Good afternoon`, and all other valid hours use `Good evening`.",
      "Use the trimmed name, or `Guest` when name is blank or not a string.",
    ],
    examples: [
      { input: 'greetByTime("Ana", 9)', output: '"Good morning, Ana!"' },
      { input: 'greetByTime("  Kai  ", 15)', output: '"Good afternoon, Kai!"' },
      { input: 'greetByTime("Mia", 24)', output: '"Invalid time"' },
    ],
    functionName: "greetByTime",
    starter: `function greetByTime(name, hour) {
  // Write your solution here
}
`,
    hints: [
      "Write down the invalid range and the three valid ranges before reading your conditions.",
      "Test the exact transition hours: 5, 12, and 18.",
      "Ask which validation must happen before any time comparison or name operation.",
    ],
    tests: [
      { label: "morning lower boundary", args: ["Ana", 5], expected: "Good morning, Ana!" },
      { label: "morning upper boundary", args: ["Ana", 11], expected: "Good morning, Ana!" },
      { label: "afternoon lower boundary", args: ["Kai", 12], expected: "Good afternoon, Kai!" },
      { label: "evening lower boundary", args: ["Mia", 18], expected: "Good evening, Mia!" },
      { label: "blank name becomes Guest", args: ["   ", 9], expected: "Good morning, Guest!" },
      {
        label: "hour outside range is invalid",
        args: ["Ana", 24],
        expected: "Invalid time",
        hidden: true,
        failureHint: "A value can be numeric yet still fall outside the allowed domain. Re-check the validation boundary.",
      },
      {
        label: "numeric string is invalid",
        args: ["Ana", "9"],
        expected: "Invalid time",
        hidden: true,
        failureHint: "The requirement distinguishes a number from something that only looks numeric. Trace the validation step.",
      },
    ],
  },
  {
    id: "greet-in-language",
    title: "Greet in a Language",
    rank: "8 kyu",
    category: "Functions + Conditions",
    drill: { label: "Function Reps", step: 4, total: 5 },
    points: 15,
    concept: "function · conditions · fallback · return",
    description: "Select one of several greeting words while keeping the name rules familiar. This rep separates message choice from name cleanup.",
    requirements: [
      "Language `ceb` uses `Kumusta`, `es` uses `Hola`, and `en` uses `Hello`.",
      "Any unsupported, blank, or non-string language falls back to `Hello`.",
      "Use the trimmed name, or `Guest` when name is blank or not a string.",
    ],
    examples: [
      { input: 'greetInLanguage("Ana", "ceb")', output: '"Kumusta, Ana!"' },
      { input: 'greetInLanguage("Kai", "es")', output: '"Hola, Kai!"' },
      { input: 'greetInLanguage("   ", "en")', output: '"Hello, Guest!"' },
    ],
    functionName: "greetInLanguage",
    starter: `function greetInLanguage(name, language) {
  // Write your solution here
}
`,
    hints: [
      "Treat choosing the greeting word and choosing the displayed name as two separate decisions.",
      "After checking the supported codes, what should every remaining language produce?",
      "Trace blank and non-string values for both parameters, one at a time.",
    ],
    tests: [
      { label: "Cebuano greeting", args: ["Ana", "ceb"], expected: "Kumusta, Ana!" },
      { label: "Spanish greeting", args: ["Kai", "es"], expected: "Hola, Kai!" },
      { label: "English greeting", args: ["Mia", "en"], expected: "Hello, Mia!" },
      { label: "unsupported language falls back", args: ["Noah", "fr"], expected: "Hello, Noah!" },
      { label: "blank name becomes Guest", args: ["  ", "ceb"], expected: "Kumusta, Guest!" },
      {
        label: "non-string language falls back",
        args: ["Ana", null],
        expected: "Hello, Ana!",
        hidden: true,
        failureHint: "Fallback behavior also applies when the selector is not usable as a language code.",
      },
      {
        label: "non-string name becomes Guest",
        args: [null, "es"],
        expected: "Hola, Guest!",
        hidden: true,
        failureHint: "The language path can be correct while the name path is not. Trace them independently.",
      },
    ],
  },
  {
    id: "greet-group",
    title: "Greet a Group",
    rank: "7 kyu",
    category: "Functions + Arrays",
    drill: { label: "Function Reps", step: 5, total: 5 },
    points: 20,
    concept: "function · array · iteration · return",
    description: "Apply the familiar greeting rule repeatedly and return every result. This final rep moves from one input value to a collection.",
    requirements: [
      "Return a new array containing one greeting for every input position.",
      "A non-blank string becomes `Hello, <trimmed name>!`; every blank or non-string entry becomes `Hello, Guest!`.",
      "Return an empty array for non-array input and do not mutate the original array.",
    ],
    examples: [
      { input: 'greetGroup(["Ana", "  Kai  "])', output: '["Hello, Ana!", "Hello, Kai!"]' },
      { input: 'greetGroup(["", null])', output: '["Hello, Guest!", "Hello, Guest!"]' },
      { input: 'greetGroup(null)', output: "[]" },
    ],
    functionName: "greetGroup",
    starter: `function greetGroup(names) {
  // Write your solution here
}
`,
    hints: [
      "First decide what the function returns when there is no valid collection to process.",
      "For a valid collection, trace the single-name rule once for each position.",
      "Compare the input and expected output shapes: what must stay aligned?",
    ],
    tests: [
      {
        label: "greets each trimmed name",
        args: [["Ana", "  Kai  "]],
        expected: ["Hello, Ana!", "Hello, Kai!"],
        noMutation: true,
      },
      {
        label: "keeps a result for invalid entries",
        args: [["", null, "Mia"]],
        expected: ["Hello, Guest!", "Hello, Guest!", "Hello, Mia!"],
        noMutation: true,
      },
      { label: "non-array becomes empty", args: [null], expected: [] },
      { label: "empty array stays empty", args: [[]], expected: [], hidden: true },
      {
        label: "does not mutate the source",
        args: [["  Ana  "]],
        expected: ["Hello, Ana!"],
        noMutation: true,
        hidden: true,
        failureHint: "The output should be new while the original input remains exactly as it was.",
      },
    ],
  },
  {
    id: "classify-number",
    title: "Positive, Zero, or Negative",
    rank: "8 kyu",
    category: "If / Else",
    points: 10,
    concept: "if · return · comparison · Number.isFinite",
    description: "Classify a number using guard clauses and ordered conditions. This is your first focused `if/else` problem.",
    requirements: [
      "Return `invalid` unless value is a finite number.",
      "Return `negative`, `zero`, or `positive`.",
      "Numeric strings such as `\"5\"` are invalid.",
    ],
    examples: [
      { input: "classifyNumber(-2)", output: '"negative"' },
      { input: "classifyNumber(0)", output: '"zero"' },
      { input: 'classifyNumber("5")', output: '"invalid"' },
    ],
    functionName: "classifyNumber",
    starter: `function classifyNumber(value) {
  // Use if/else or guard clauses
}
`,
    hints: [
      "Reject invalid input before comparing it.",
      "After the invalid guard, compare with 0.",
      "Once negative and zero have returned, the remaining valid case is positive.",
    ],
    tests: [
      { label: "negative number", args: [-2], expected: "negative" },
      { label: "zero boundary", args: [0], expected: "zero" },
      { label: "positive number", args: [0.25], expected: "positive" },
      { label: "numeric string is invalid", args: ["5"], expected: "invalid" },
      { label: "NaN is invalid", args: [{ __special: "NaN" }], expected: "invalid", hidden: true },
      { label: "Infinity is invalid", args: [{ __special: "Infinity" }], expected: "invalid", hidden: true },
    ],
  },
  {
    id: "grade-label",
    title: "Grade Label",
    rank: "8 kyu",
    category: "If / Else",
    points: 15,
    concept: "if · else · >= · boundaries",
    description: "Turn a numeric score into a grade. The order of your conditions matters because higher scores also satisfy lower boundaries.",
    requirements: [
      "Return `Invalid` unless score is a finite number from 0 to 100.",
      "90–100 → A, 80–89 → B, 75–79 → C, below 75 → F.",
      "Handle every exact boundary correctly.",
    ],
    examples: [
      { input: "getGrade(90)", output: '"A"' },
      { input: "getGrade(79)", output: '"C"' },
      { input: "getGrade(101)", output: '"Invalid"' },
    ],
    functionName: "getGrade",
    starter: `function getGrade(score) {
  // Validate first, then check highest boundary to lowest
}
`,
    hints: [
      "Guard against values below 0 or above 100 first.",
      "Check `>= 90` before `>= 80`.",
      "After A, B, and C return, the remaining valid score is F.",
    ],
    tests: [
      { label: "top score", args: [100], expected: "A" },
      { label: "A boundary", args: [90], expected: "A" },
      { label: "B boundary", args: [80], expected: "B" },
      { label: "C boundary", args: [75], expected: "C" },
      { label: "failing score", args: [74], expected: "F" },
      { label: "negative is invalid", args: [-1], expected: "Invalid", hidden: true },
      { label: "over 100 is invalid", args: [101], expected: "Invalid", hidden: true },
    ],
  },
  {
    id: "is-even",
    title: "Finite Even Number",
    rank: "8 kyu",
    category: "Operators",
    points: 10,
    concept: "remainder % · boolean · finite number",
    description: "Return whether a value is a finite even number. Practice combining validation and a remainder check.",
    requirements: [
      "Return a boolean—not the strings `true` or `false`.",
      "Only finite number values may return true.",
      "Negative even numbers are valid.",
    ],
    examples: [
      { input: "isEven(4)", output: "true" },
      { input: "isEven(-2)", output: "true" },
      { input: 'isEven("4")', output: "false" },
    ],
    functionName: "isEven",
    starter: `function isEven(value) {
  // Validate, then use the remainder operator
}
`,
    hints: [
      "An even number leaves a remainder of 0 when divided by 2.",
      "Use Number.isFinite before the remainder check.",
    ],
    tests: [
      { label: "positive even", args: [4], expected: true },
      { label: "negative even", args: [-2], expected: true },
      { label: "odd number", args: [3], expected: false },
      { label: "string is rejected", args: ["4"], expected: false },
      { label: "Infinity is rejected", args: [{ __special: "Infinity" }], expected: false, hidden: true },
    ],
  },
  {
    id: "calculate-total",
    title: "Discounted Total",
    rank: "7 kyu",
    category: "Business Logic",
    points: 20,
    concept: "validation · arithmetic · default parameter",
    description: "Calculate a line-item total after discount while protecting the function from invalid business inputs.",
    requirements: [
      "Compute `price × quantity` after discountPercent.",
      "Return 0 when quantity is 0.",
      "Return null if inputs are non-finite/negative or discount exceeds 100.",
    ],
    examples: [
      { input: "calculateTotal(100, 2, 10)", output: "180" },
      { input: "calculateTotal(49.5, 0)", output: "0" },
    ],
    functionName: "calculateTotal",
    starter: `function calculateTotal(price, quantity, discountPercent = 0) {
  // Validate all inputs before calculating
}
`,
    hints: [
      "Validate all three values with Number.isFinite.",
      "A 10% discount means multiplying the subtotal by 0.90.",
      "The multiplier can be written as `1 - discountPercent / 100`.",
    ],
    tests: [
      { label: "applies discount", args: [100, 2, 10], expected: 180 },
      { label: "default zero discount", args: [10, 3], expected: 30 },
      { label: "zero quantity", args: [49.5, 0], expected: 0 },
      { label: "negative price rejected", args: [-1, 2], expected: null },
      { label: "discount over 100 rejected", args: [10, 2, 101], expected: null, hidden: true },
      { label: "numeric string rejected", args: ["10", 2], expected: null, hidden: true },
    ],
  },
  {
    id: "sum-even-numbers",
    title: "Sum Even Numbers",
    rank: "7 kyu",
    category: "Arrays",
    points: 20,
    concept: "array · loop · accumulator · validation",
    description: "Walk through an array, keep only finite even numbers, and accumulate their sum.",
    requirements: [
      "Return 0 for non-array input.",
      "Ignore odd numbers, strings, NaN, and Infinity.",
      "Do not mutate the input array.",
    ],
    examples: [
      { input: "sumEvenNumbers([1, 2, 4, 7, -2])", output: "4" },
      { input: "sumEvenNumbers(null)", output: "0" },
    ],
    functionName: "sumEvenNumbers",
    starter: `function sumEvenNumbers(values) {
  // Validate the array, then accumulate valid even numbers
}
`,
    hints: [
      "Start an accumulator at 0.",
      "A for...of loop is a clear first solution.",
      "For each value, combine Number.isFinite and the remainder check.",
    ],
    tests: [
      { label: "mixed values", args: [[1, 2, 4, 7, -2]], expected: 4, noMutation: true },
      { label: "empty array", args: [[]], expected: 0 },
      { label: "non-array", args: [null], expected: 0 },
      { label: "ignores invalid values", args: [[2, "4", { __special: "NaN" }, { __special: "Infinity" }, 6]], expected: 8, hidden: true },
    ],
  },
  {
    id: "find-largest",
    title: "Find the Largest",
    rank: "7 kyu",
    category: "Arrays",
    points: 20,
    concept: "array · loop · comparison · null",
    description: "Find the largest finite number without sorting or changing the input.",
    requirements: [
      "Ignore non-numbers, NaN, and Infinity.",
      "Return null when there is no valid number.",
      "Do not sort or mutate the input.",
    ],
    examples: [
      { input: 'findLargest([3, 99, -5, "100", 42])', output: "99" },
      { input: 'findLargest(["5"])', output: "null" },
    ],
    functionName: "findLargest",
    starter: `function findLargest(values) {
  // Track the largest valid value seen so far
}
`,
    hints: [
      "Use null to represent that no valid number has been seen yet.",
      "The first valid number should become the current largest.",
      "A one-pass solution is O(n); sorting is unnecessary.",
    ],
    tests: [
      { label: "mixed values", args: [[3, 99, -5, "100", 42]], expected: 99, noMutation: true },
      { label: "all negative", args: [[-10, -3, -20]], expected: -3 },
      { label: "no valid number", args: [["5", null]], expected: null },
      { label: "non-array", args: [null], expected: null, hidden: true },
    ],
  },
  {
    id: "count-words",
    title: "Count Words",
    rank: "7 kyu",
    category: "Strings",
    points: 15,
    concept: "string · trim · split · regular expression",
    description: "Count words separated by one or more whitespace characters, including spaces, tabs, and new lines.",
    requirements: [
      "Blank or non-string input returns 0.",
      "Ignore outer whitespace.",
      "Treat one or more whitespace characters as one separator.",
    ],
    examples: [
      { input: 'countWords("  grind   from\\n scratch ")', output: "3" },
      { input: 'countWords("   ")', output: "0" },
    ],
    functionName: "countWords",
    starter: `function countWords(text) {
  // Validate, normalize whitespace, then count
}
`,
    hints: [
      "Check the type and blank case before splitting.",
      "The regular expression `/\\s+/` matches one or more whitespace characters.",
    ],
    tests: [
      { label: "normal sentence", args: ["grind from scratch"], expected: 3 },
      { label: "varied whitespace", args: ["  grind   from\n scratch "], expected: 3 },
      { label: "one word", args: ["one"], expected: 1 },
      { label: "blank text", args: ["   "], expected: 0 },
      { label: "non-string", args: [123], expected: 0, hidden: true },
    ],
  },
  {
    id: "unique-values",
    title: "Unique Values",
    rank: "7 kyu",
    category: "Arrays",
    points: 20,
    concept: "Set · array · first-seen order",
    description: "Remove duplicate values while preserving the order in which each value first appeared.",
    requirements: [
      "Return a new array.",
      "Keep first-seen order.",
      "Treat repeated NaN values as duplicates.",
    ],
    examples: [
      { input: "uniqueValues([2, 1, 2, 3, 1])", output: "[2, 1, 3]" },
    ],
    functionName: "uniqueValues",
    starter: `function uniqueValues(values) {
  // Return unique values in first-seen order
}
`,
    hints: [
      "A Set stores each value only once.",
      "You can spread a Set into a new array.",
    ],
    tests: [
      { label: "removes duplicates", args: [[2, 1, 2, 3, 1]], expected: [2, 1, 3], noMutation: true },
      { label: "empty array", args: [[]], expected: [] },
      { label: "repeated NaN", args: [[{ __special: "NaN" }, { __special: "NaN" }, 1]], expected: [{ __special: "NaN" }, 1], hidden: true },
    ],
  },
  {
    id: "toggle-user",
    title: "Toggle User Status",
    rank: "7 kyu",
    category: "Objects",
    points: 20,
    concept: "object · spread · immutability · boolean",
    description: "Return a new user object with its active state toggled while leaving the original untouched.",
    requirements: [
      "Return null for null, arrays, and non-object input.",
      "Return a new object with all existing fields.",
      "Set active to the opposite boolean value.",
    ],
    examples: [
      { input: "toggleUserActive({ id: 1, active: false })", output: "{ id: 1, active: true }" },
    ],
    functionName: "toggleUserActive",
    starter: `function toggleUserActive(user) {
  // Validate, then return a copied object with active toggled
}
`,
    hints: [
      "Arrays have typeof object, so reject them separately.",
      "Use object spread to copy existing properties.",
      "The logical NOT operator flips a boolean.",
    ],
    tests: [
      { label: "false becomes true", args: [{ id: 1, name: "Kai", active: false }], expected: { id: 1, name: "Kai", active: true }, noMutation: true },
      { label: "true becomes false", args: [{ id: 2, active: true }], expected: { id: 2, active: false }, noMutation: true },
      { label: "null rejected", args: [null], expected: null },
      { label: "array rejected", args: [[]], expected: null, hidden: true },
    ],
  },
  {
    id: "group-status",
    title: "Group by Status",
    rank: "6 kyu",
    category: "Objects + Arrays",
    points: 30,
    concept: "reduce · dynamic keys · grouping",
    description: "Transform a flat list of records into an object grouped by status.",
    requirements: [
      "Each output key is a status and its value is an array of matching items.",
      "Missing or blank status belongs to `unknown`.",
      "Preserve original item order and do not mutate input.",
    ],
    examples: [
      { input: 'groupByStatus([{ id: 1, status: "open" }, { id: 2, status: "open" }])', output: '{ open: [{ id: 1, ... }, { id: 2, ... }] }' },
    ],
    functionName: "groupByStatus",
    starter: `function groupByStatus(items) {
  // Build and return an object of grouped arrays
}
`,
    hints: [
      "Start with an empty object.",
      "Choose `unknown` when status is missing or blank.",
      "Create the group array the first time you see a key, then push the item.",
    ],
    tests: [
      {
        label: "groups repeated statuses",
        args: [[{ id: 1, status: "open" }, { id: 2, status: "done" }, { id: 3, status: "open" }]],
        expected: { open: [{ id: 1, status: "open" }, { id: 3, status: "open" }], done: [{ id: 2, status: "done" }] },
        noMutation: true,
      },
      {
        label: "uses unknown fallback",
        args: [[{ id: 1 }, { id: 2, status: "  " }]],
        expected: { unknown: [{ id: 1 }, { id: 2, status: "  " }] },
      },
      { label: "empty input", args: [[]], expected: {} },
    ],
  },
  ...arrayFundamentalsChallenges,
  ...debuggingChallenges,
];
