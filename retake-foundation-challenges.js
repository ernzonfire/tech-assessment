const ASSESSMENT_ITEMS = [
  { name: "Item A", rating: 5 },
  { name: "Item B", rating: 2 },
  { name: "Item C", rating: 4 },
  { name: "Item D", rating: null },
  { name: "Item E", rating: 3 },
  { name: "Item F", rating: 1 },
  { name: "Item G", rating: 5 },
  { name: "Item H", rating: 0 },
  { name: "Item I", rating: 4 },
  { name: "Item J", rating: 3 },
];

const VALID_ASSESSMENT_ITEMS = ASSESSMENT_ITEMS.filter((item) => Number.isFinite(item.rating));
const SORTED_ASSESSMENT_ITEMS = [...VALID_ASSESSMENT_ITEMS].sort((a, b) => b.rating - a.rating);

export const retakeFoundationChallenges = [
  {
    id: "retake-valid-rating",
    title: "Recognize a Valid Rating",
    rank: "8 kyu",
    category: "Retake · Types",
    drill: { label: "Retake Foundation", step: 1, total: 5 },
    points: 10,
    concept: "number · null · Number.isFinite · boolean",
    description: "Sugdi sa pinakagamay nga decision: numeric ug finite ba ang rating? This trains you to inspect the value and its type before touching an array method.",
    requirements: [
      "Return `true` only when `item.rating` is a finite number.",
      "A rating of `0` is valid; `null`, numeric strings, `NaN`, and missing ratings are invalid.",
      "Return `false` when item is null, an array, or not an object.",
    ],
    examples: [
      { input: "hasValidRating({ rating: 5 })", output: "true" },
      { input: "hasValidRating({ rating: null })", output: "false" },
      { input: "hasValidRating({ rating: 0 })", output: "true" },
    ],
    functionName: "hasValidRating",
    starter: `function hasValidRating(item) {
  // Inspect the input and return one boolean.
}
`,
    hints: [
      "Before reading `item.rating`, confirm that item is a non-null object and not an array.",
      "Do not use truthiness for the rating because `0` is falsy but valid.",
      "`Number.isFinite(item.rating)` accepts real finite numbers without converting strings.",
    ],
    tests: [
      { label: "positive number is valid", args: [{ rating: 5 }], expected: true },
      { label: "zero is valid", args: [{ rating: 0 }], expected: true },
      { label: "null rating is invalid", args: [{ rating: null }], expected: false },
      { label: "numeric string is invalid", args: [{ rating: "5" }], expected: false },
      { label: "missing rating is invalid", args: [{}], expected: false, hidden: true },
      { label: "null item is invalid", args: [null], expected: false, hidden: true },
      { label: "infinite rating is invalid", args: [{ rating: { __special: "Infinity" } }], expected: false, hidden: true },
    ],
  },
  {
    id: "retake-filter-ratings",
    title: "Filter Valid Items",
    rank: "8 kyu",
    category: "Retake · Filter",
    drill: { label: "Retake Foundation", step: 2, total: 5 },
    points: 15,
    concept: "array · filter · callback · object property",
    description: "Practice the first assessment function. Follow one item at a time and keep only objects with finite numeric ratings.",
    requirements: [
      "Return a new array containing only items with finite numeric ratings.",
      "Keep rating `0`; remove `null`, strings, missing values, `NaN`, and infinities.",
      "Return an empty array when the input is not an array and do not mutate the input.",
    ],
    examples: [
      { input: "searchValidItems([{ rating: 5 }, { rating: null }, { rating: 0 }])", output: "[{ rating: 5 }, { rating: 0 }]" },
    ],
    functionName: "searchValidItems",
    starter: `function searchValidItems(array) {
  // Use filter() and inspect item.rating.
}
`,
    hints: [
      "Guard the collection with `Array.isArray(array)` before calling `.filter()`.",
      "The filter callback receives one item object and must return true or false.",
      "Keep an item when `Number.isFinite(item.rating)` is true.",
    ],
    tests: [
      { label: "removes the null rating", args: [ASSESSMENT_ITEMS], expected: VALID_ASSESSMENT_ITEMS, noMutation: true },
      { label: "keeps a zero rating", args: [[{ name: "Zero", rating: 0 }, { name: "No", rating: null }]], expected: [{ name: "Zero", rating: 0 }], noMutation: true },
      { label: "rejects strings and infinities", args: [[{ rating: "5" }, { rating: { __special: "Infinity" } }, { rating: 3 }]], expected: [{ rating: 3 }], noMutation: true },
      { label: "non-array becomes empty", args: [null], expected: [], hidden: true },
    ],
  },
  {
    id: "retake-find-rating",
    title: "Find Rating by Name",
    rank: "8 kyu",
    category: "Retake · Find",
    drill: { label: "Retake Foundation", step: 3, total: 5 },
    points: 15,
    concept: "find · object property · parameter · strict equality",
    description: "Practice comparing a search string with an object property—not with the whole object.",
    requirements: [
      "Find the first item whose `name` exactly equals `itemName`.",
      "Return that item's rating, including a valid rating of `0`.",
      "Return `null` when no match exists or the input is not an array.",
    ],
    examples: [
      { input: 'getRating("Item A", items)', output: "5" },
      { input: 'getRating("Missing", items)', output: "null" },
    ],
    functionName: "getRating",
    starter: `function getRating(itemName, array) {
  // Find by item.name, then return its rating.
}
`,
    hints: [
      "Write the shapes beside the comparison: itemName is a string; item is an object.",
      "The matching callback is `item.name === itemName`.",
      "After `.find()`, return `item ? item.rating : null`. This preserves a rating of 0.",
    ],
    tests: [
      { label: "finds Item A", args: ["Item A", ASSESSMENT_ITEMS], expected: 5 },
      { label: "preserves a zero rating", args: ["Item H", ASSESSMENT_ITEMS], expected: 0 },
      { label: "missing item becomes null", args: ["Missing", ASSESSMENT_ITEMS], expected: null },
      { label: "match is case-sensitive", args: ["item a", ASSESSMENT_ITEMS], expected: null, hidden: true },
      { label: "non-array becomes null", args: ["Item A", null], expected: null, hidden: true },
    ],
  },
  {
    id: "retake-sort-ratings",
    title: "Sort Ratings Without Mutation",
    rank: "7 kyu",
    category: "Retake · Sort",
    drill: { label: "Retake Foundation", step: 4, total: 5 },
    points: 20,
    concept: "sort · descending comparator · spread copy · mutation",
    description: "Practice the assessment comparator and the hidden side effect of `.sort()`.",
    requirements: [
      "Return items ordered from highest rating to lowest rating.",
      "Copy the array before sorting so the caller's order stays unchanged.",
      "Return an empty array when the input is not an array.",
    ],
    examples: [
      { input: "sortByRating([{ rating: 2 }, { rating: 5 }, { rating: 4 }])", output: "[{ rating: 5 }, { rating: 4 }, { rating: 2 }]" },
    ],
    functionName: "sortByRating",
    starter: `function sortByRating(array) {
  // Copy first, then sort descending.
}
`,
    hints: [
      "The comparator `b.rating - a.rating` is already the descending pattern.",
      "`.sort()` changes the array it is called on, even when its return value looks correct.",
      "Sort a spread copy: `[...array].sort((a, b) => b.rating - a.rating)`.",
    ],
    tests: [
      { label: "sorts highest to lowest", args: [VALID_ASSESSMENT_ITEMS], expected: SORTED_ASSESSMENT_ITEMS, noMutation: true },
      { label: "keeps equal ratings", args: [[{ name: "A", rating: 5 }, { name: "B", rating: 5 }]], expected: [{ name: "A", rating: 5 }, { name: "B", rating: 5 }], noMutation: true },
      { label: "keeps zero at the end", args: [[{ rating: 0 }, { rating: 2 }]], expected: [{ rating: 2 }, { rating: 0 }], noMutation: true },
      { label: "non-array becomes empty", args: [undefined], expected: [], hidden: true },
    ],
  },
  {
    id: "retake-debug-assessment",
    title: "Debug the Full Assessment",
    rank: "6 kyu",
    category: "Retake · Full Debug",
    drill: { label: "Retake Foundation", step: 5, total: 5 },
    points: 40,
    concept: "execution flow · variable names · arguments · filter · find · sort",
    description: "Final simulation: intentionally broken helper functions are connected into one report. Run first, fix the earliest failure, and repeat until every test passes.",
    requirements: [
      "Return `{ validItems, sortedItems, rating }` for the supplied data and item name.",
      "Valid ratings are finite numbers, including zero; sorted items must be highest-to-lowest.",
      "Keep `validItems` in its original order and do not mutate the caller's data.",
      "Repair the existing code instead of replacing the entire pipeline with one unrelated solution.",
    ],
    examples: [
      { input: 'createRatingReport("Item A", items)', output: "{ validItems: [...], sortedItems: [...], rating: 5 }" },
    ],
    functionName: "createRatingReport",
    starter: `function searchValidItems(array) {
  return array.filter((item) => typeof item.rating === "string");
}

function sortByRating(array) {
  return array.sort((a, b) => b.rating - a.rating);
}

function getRating(itemName, array) {
  const item = array.find((item) => itemName === item);
  return item ? item.rating : null;
}

function createRatingReport(itemName, data) {
  const item = data;
  const validItems = searchValidItems(items);
  const sortedItems = sortByRating();
  const rating = getRating(itemName, validItems);

  return { validItems, sortedItems, rating };
}
`,
    hints: [
      "Start at `createRatingReport`, not at the first helper. Which variable name is declared, and which name is passed to `searchValidItems`?",
      "After the runtime error is gone, inspect the value and type of each rating. The valid values in the supplied data are numbers, not strings.",
      "`sortByRating` expects one parameter. Trace the call and identify the missing argument.",
      "Inside `.find()`, itemName is a string while item is an object. Compare the string with `item.name`.",
      "If the values look right but the original-order test fails, remember that `.sort()` mutates. Sort a copied array.",
    ],
    tests: [
      {
        label: "builds the Item A report",
        args: ["Item A", ASSESSMENT_ITEMS],
        expected: { validItems: VALID_ASSESSMENT_ITEMS, sortedItems: SORTED_ASSESSMENT_ITEMS, rating: 5 },
        noMutation: true,
      },
      {
        label: "preserves rating zero",
        args: ["Item H", ASSESSMENT_ITEMS],
        expected: { validItems: VALID_ASSESSMENT_ITEMS, sortedItems: SORTED_ASSESSMENT_ITEMS, rating: 0 },
        noMutation: true,
      },
      {
        label: "missing name becomes null",
        args: ["Missing", ASSESSMENT_ITEMS],
        expected: { validItems: VALID_ASSESSMENT_ITEMS, sortedItems: SORTED_ASSESSMENT_ITEMS, rating: null },
        noMutation: true,
      },
      {
        label: "rejects non-finite and string ratings",
        args: ["Good", [{ name: "Text", rating: "5" }, { name: "Infinite", rating: { __special: "Infinity" } }, { name: "Good", rating: 3 }]],
        expected: { validItems: [{ name: "Good", rating: 3 }], sortedItems: [{ name: "Good", rating: 3 }], rating: 3 },
        noMutation: true,
        hidden: true,
      },
    ],
  },
];
