const PRODUCTS = [
  { name: "Laptop", price: 45000, stock: 5, rating: 4.8 },
  { name: "Mouse", price: 700, stock: 0, rating: 4.2 },
  { name: "Keyboard", price: 1500, stock: 10, rating: 4.5 },
  { name: "Monitor", price: 12000, stock: 3, rating: 4.7 },
  { name: "Headset", price: null, stock: 8, rating: 3.9 },
  { name: "Webcam", price: 2500, stock: 0, rating: 4.1 },
];

const AVAILABLE_PRODUCTS = PRODUCTS.filter((product) => product.stock > 0);
const VALID_PRICE_PRODUCTS = PRODUCTS.filter((product) => Number.isFinite(product.price));

export const arrayFundamentalsChallenges = [
  {
    id: "products-in-stock",
    title: "Available Products",
    rank: "8 kyu",
    category: "Arrays · Filter",
    drill: { label: "Array Fundamentals", step: 1, total: 10 },
    points: 10,
    concept: "array · filter · object property · comparison",
    description: "Filter a product catalog so the result contains only products that customers can currently buy.",
    requirements: [
      "Return only products whose `stock` is greater than 0.",
      "Return an empty array when the input is not an array.",
      "Return a new array and do not modify the original products.",
    ],
    examples: [
      { input: "getAvailableProducts([{ name: \"Mouse\", stock: 0 }, { name: \"Laptop\", stock: 5 }])", output: '[{ name: "Laptop", stock: 5 }]' },
      { input: "getAvailableProducts(null)", output: "[]" },
    ],
    functionName: "getAvailableProducts",
    starter: `function getAvailableProducts(products) {
  // Use filter() to keep products that have stock
}
`,
    hints: [
      "Validate the collection with `Array.isArray()` before using an array method.",
      "The filter callback needs a boolean expression based on `product.stock`.",
      "Keep a product when `product.stock > 0`.",
    ],
    tests: [
      { label: "keeps products with stock", args: [PRODUCTS], expected: AVAILABLE_PRODUCTS, noMutation: true },
      { label: "returns an empty array when everything is sold out", args: [[{ name: "Mouse", stock: 0 }]], expected: [], noMutation: true },
      { label: "handles an empty catalog", args: [[]], expected: [] },
      { label: "rejects non-array input", args: [null], expected: [], hidden: true },
    ],
  },
  {
    id: "products-valid-price",
    title: "Products with Valid Prices",
    rank: "8 kyu",
    category: "Arrays · Validation",
    drill: { label: "Array Fundamentals", step: 2, total: 10 },
    points: 15,
    concept: "filter · Number.isFinite · data validation",
    description: "Clean a product list by keeping only entries whose price is a real, finite number.",
    requirements: [
      "Keep a product only when `price` is a finite number; `null` and numeric strings are invalid.",
      "Return an empty array for non-array input.",
      "Do not mutate the source array or its objects.",
    ],
    examples: [
      { input: 'getProductsWithValidPrice([{ price: 700 }, { price: null }, { price: "500" }])', output: "[{ price: 700 }]" },
    ],
    functionName: "getProductsWithValidPrice",
    starter: `function getProductsWithValidPrice(products) {
  // Keep products with a finite numeric price
}
`,
    hints: [
      "`typeof null` has a surprising result, so a type check by itself is not enough here.",
      "`Number.isFinite(value)` accepts finite numbers without converting strings.",
      "Combine `filter()` with `Number.isFinite(product.price)`.",
    ],
    tests: [
      { label: "removes the null price", args: [PRODUCTS], expected: VALID_PRICE_PRODUCTS, noMutation: true },
      {
        label: "rejects non-numeric and non-finite prices",
        args: [[{ name: "A", price: "100" }, { name: "B", price: 0 }, { name: "C", price: { __special: "Infinity" } }]],
        expected: [{ name: "B", price: 0 }],
        noMutation: true,
      },
      { label: "rejects non-array input", args: [undefined], expected: [], hidden: true },
    ],
  },
  {
    id: "find-product-name",
    title: "Find a Product by Name",
    rank: "8 kyu",
    category: "Arrays · Find",
    drill: { label: "Array Fundamentals", step: 3, total: 10 },
    points: 15,
    concept: "find · object property · strict equality · null",
    description: "Search the catalog for one product by its exact name and return the matching object.",
    requirements: [
      "Return the first product whose `name` exactly matches `productName`.",
      "Return `null` when no product matches or when products is not an array.",
      "Compare `product.name` with the search string—not the whole product object.",
    ],
    examples: [
      { input: 'findProduct("Mouse", products)', output: '{ name: "Mouse", price: 700, ... }' },
      { input: 'findProduct("Phone", products)', output: "null" },
    ],
    functionName: "findProduct",
    starter: `function findProduct(productName, products) {
  // Find the product whose name matches productName
}
`,
    hints: [
      "The callback receives one product object at a time.",
      "Use `.find()` and compare the object's `name` property.",
      "`.find()` returns `undefined` when nothing matches; convert that result to `null`.",
    ],
    tests: [
      { label: "finds an existing product", args: ["Mouse", PRODUCTS], expected: PRODUCTS[1], noMutation: true },
      { label: "returns the first exact match", args: ["Laptop", [{ name: "laptop" }, { name: "Laptop", id: 2 }, { name: "Laptop", id: 3 }]], expected: { name: "Laptop", id: 2 }, noMutation: true },
      { label: "returns null when missing", args: ["Phone", PRODUCTS], expected: null },
      { label: "rejects a non-array catalog", args: ["Mouse", null], expected: null, hidden: true },
    ],
  },
  {
    id: "sort-products-price",
    title: "Sort by Price",
    rank: "7 kyu",
    category: "Arrays · Sort",
    drill: { label: "Array Fundamentals", step: 4, total: 10 },
    points: 20,
    concept: "filter · sort · comparator · array copy",
    description: "Prepare a clean price list ordered from the cheapest valid product to the most expensive.",
    requirements: [
      "Exclude products whose price is not a finite number.",
      "Sort valid products from lowest price to highest price.",
      "Do not mutate the original array; sort a new array.",
    ],
    examples: [
      { input: 'sortByPrice([{ name: "A", price: 50 }, { name: "B", price: 10 }])', output: '[{ name: "B", price: 10 }, { name: "A", price: 50 }]' },
    ],
    functionName: "sortByPrice",
    starter: `function sortByPrice(products) {
  // Filter invalid prices, then sort a new array ascending
}
`,
    hints: [
      "Filtering first gives you a new array containing only valid prices.",
      "For ascending numeric order, the comparator subtracts right price from left price.",
      "Use `(a, b) => a.price - b.price`.",
    ],
    tests: [
      {
        label: "filters and sorts prices ascending",
        args: [PRODUCTS],
        expected: [PRODUCTS[1], PRODUCTS[2], PRODUCTS[5], PRODUCTS[3], PRODUCTS[0]],
        noMutation: true,
      },
      { label: "handles equal prices", args: [[{ name: "A", price: 10 }, { name: "B", price: 10 }]], expected: [{ name: "A", price: 10 }, { name: "B", price: 10 }], noMutation: true },
      { label: "rejects non-array input", args: [null], expected: [], hidden: true },
    ],
  },
  {
    id: "sort-products-rating",
    title: "Sort by Rating",
    rank: "7 kyu",
    category: "Arrays · Sort",
    drill: { label: "Array Fundamentals", step: 5, total: 10 },
    points: 20,
    concept: "filter · sort · descending comparator · immutability",
    description: "Build a leaderboard of products ordered from the highest valid rating to the lowest.",
    requirements: [
      "Keep only products whose `rating` is a finite number.",
      "Sort from highest rating to lowest rating.",
      "Return a new array and leave the original order untouched.",
    ],
    examples: [
      { input: 'sortByRating([{ rating: 2 }, { rating: 5 }, { rating: 4 }])', output: "[{ rating: 5 }, { rating: 4 }, { rating: 2 }]" },
    ],
    functionName: "sortByRating",
    starter: `function sortByRating(products) {
  // Keep valid ratings and sort them descending
}
`,
    hints: [
      "Validate ratings before sorting them.",
      "`.sort()` changes the array it is called on, so make sure you are sorting a new array.",
      "For descending order, use `(a, b) => b.rating - a.rating`.",
    ],
    tests: [
      {
        label: "sorts ratings descending",
        args: [PRODUCTS],
        expected: [PRODUCTS[0], PRODUCTS[3], PRODUCTS[2], PRODUCTS[1], PRODUCTS[5], PRODUCTS[4]],
        noMutation: true,
      },
      {
        label: "removes invalid ratings",
        args: [[{ name: "A", rating: null }, { name: "B", rating: 0 }, { name: "C", rating: "5" }]],
        expected: [{ name: "B", rating: 0 }],
        noMutation: true,
      },
      { label: "rejects non-array input", args: [null], expected: [], hidden: true },
    ],
  },
  {
    id: "map-product-names",
    title: "Get Product Names",
    rank: "8 kyu",
    category: "Arrays · Map",
    drill: { label: "Array Fundamentals", step: 6, total: 10 },
    points: 15,
    concept: "map · transformation · object property",
    description: "Transform an array of product objects into a simpler array containing only their names.",
    requirements: [
      "Return one name for every product, in the same order.",
      "Use the product's `name` property as each result.",
      "Return an empty array for non-array input and do not mutate the source.",
    ],
    examples: [
      { input: 'getProductNames([{ name: "Laptop" }, { name: "Mouse" }])', output: '["Laptop", "Mouse"]' },
    ],
    functionName: "getProductNames",
    starter: `function getProductNames(products) {
  // Use map() to return only the product names
}
`,
    hints: [
      "`map()` creates one output value for every input position.",
      "The callback only needs to return `product.name`.",
    ],
    tests: [
      { label: "maps every product name", args: [PRODUCTS], expected: ["Laptop", "Mouse", "Keyboard", "Monitor", "Headset", "Webcam"], noMutation: true },
      { label: "keeps the original order", args: [[{ name: "B" }, { name: "A" }]], expected: ["B", "A"], noMutation: true },
      { label: "handles an empty catalog", args: [[]], expected: [] },
      { label: "rejects non-array input", args: [null], expected: [], hidden: true },
    ],
  },
  {
    id: "reduce-total-stock",
    title: "Calculate Total Stock",
    rank: "7 kyu",
    category: "Arrays · Reduce",
    drill: { label: "Array Fundamentals", step: 7, total: 10 },
    points: 20,
    concept: "reduce · accumulator · numeric validation",
    description: "Add the stock quantities across the whole catalog while safely ignoring invalid stock values.",
    requirements: [
      "Return the sum of every finite numeric `stock` value.",
      "Ignore missing, non-numeric, and non-finite stock values.",
      "Return 0 for an empty or non-array input.",
    ],
    examples: [
      { input: 'getTotalStock([{ stock: 5 }, { stock: 3 }, { stock: "2" }])', output: "8" },
    ],
    functionName: "getTotalStock",
    starter: `function getTotalStock(products) {
  // Use reduce() to add every valid stock value
}
`,
    hints: [
      "Start the reducer with an accumulator value of 0.",
      "For each product, decide whether `product.stock` is safe to add.",
      "Add the stock when `Number.isFinite(product.stock)` is true; otherwise add 0.",
    ],
    tests: [
      { label: "totals the catalog stock", args: [PRODUCTS], expected: 26, noMutation: true },
      { label: "ignores invalid stock", args: [[{ stock: 2 }, { stock: "3" }, {}, { stock: { __special: "Infinity" } }]], expected: 2, noMutation: true },
      { label: "handles an empty catalog", args: [[]], expected: 0 },
      { label: "rejects non-array input", args: [null], expected: 0, hidden: true },
    ],
  },
  {
    id: "average-product-rating",
    title: "Average Product Rating",
    rank: "7 kyu",
    category: "Arrays · Reduce",
    drill: { label: "Array Fundamentals", step: 8, total: 10 },
    points: 25,
    concept: "filter · reduce · average · empty state",
    description: "Calculate the average of all valid product ratings without letting bad values distort the result.",
    requirements: [
      "Average only finite numeric ratings.",
      "Return the exact average without rounding.",
      "Return 0 when the input is not an array or has no valid ratings.",
    ],
    examples: [
      { input: "getAverageRating([{ rating: 4 }, { rating: 5 }])", output: "4.5" },
      { input: "getAverageRating([{ rating: null }])", output: "0" },
    ],
    functionName: "getAverageRating",
    starter: `function getAverageRating(products) {
  // Keep valid ratings, then divide their total by their count
}
`,
    hints: [
      "First create an array containing only valid rating numbers.",
      "Use `reduce()` for the total and `.length` for the count.",
      "Handle zero valid ratings before dividing so you never return `NaN`.",
    ],
    tests: [
      { label: "averages normal ratings", args: [[{ rating: 4 }, { rating: 5 }]], expected: 4.5, noMutation: true },
      { label: "averages the product catalog", args: [PRODUCTS], expected: 4.366666666666666, noMutation: true },
      { label: "ignores invalid ratings", args: [[{ rating: 3 }, { rating: null }, { rating: "5" }]], expected: 3, noMutation: true },
      { label: "returns zero without valid ratings", args: [[{ rating: null }]], expected: 0, hidden: true },
      { label: "rejects non-array input", args: [null], expected: 0, hidden: true },
    ],
  },
  {
    id: "immutable-add-stock",
    title: "Update Product Stock",
    rank: "6 kyu",
    category: "Arrays · Immutability",
    drill: { label: "Array Fundamentals", step: 9, total: 10 },
    points: 30,
    concept: "map · object spread · immutable update · validation",
    description: "Add stock to one named product while preserving the original array and every original product object.",
    requirements: [
      "For the matching product, return a copied object whose `stock` is increased by `amount`.",
      "Keep non-matching products unchanged and return a new array.",
      "Return an unchanged copy when amount is negative/non-finite or products is not an array.",
    ],
    examples: [
      { input: 'addStock("Mouse", 5, [{ name: "Mouse", stock: 0 }])', output: '[{ name: "Mouse", stock: 5 }]' },
    ],
    functionName: "addStock",
    starter: `function addStock(productName, amount, products) {
  // Use map() and object spread to update one product immutably
}
`,
    hints: [
      "Validate the array first; spread can make a shallow unchanged copy.",
      "Use `map()` to choose between an updated product and the original product.",
      "For a match, return `{ ...product, stock: product.stock + amount }`.",
    ],
    tests: [
      {
        label: "adds stock to the matching product",
        args: ["Mouse", 5, PRODUCTS],
        expected: [PRODUCTS[0], { ...PRODUCTS[1], stock: 5 }, PRODUCTS[2], PRODUCTS[3], PRODUCTS[4], PRODUCTS[5]],
        noMutation: true,
      },
      { label: "leaves the catalog values unchanged when missing", args: ["Phone", 5, PRODUCTS], expected: PRODUCTS, noMutation: true },
      { label: "rejects a negative amount", args: ["Mouse", -1, PRODUCTS], expected: PRODUCTS, noMutation: true },
      { label: "rejects a numeric string amount", args: ["Mouse", "5", PRODUCTS], expected: PRODUCTS, noMutation: true, hidden: true },
      { label: "rejects non-array input", args: ["Mouse", 5, null], expected: [], hidden: true },
    ],
  },
  {
    id: "product-summaries",
    title: "Create Product Summaries",
    rank: "6 kyu",
    category: "Arrays · Final Challenge",
    drill: { label: "Array Fundamentals", step: 10, total: 10 },
    points: 35,
    concept: "map · template literal · conditional formatting",
    description: "Combine object access, validation, mapping, and string formatting to create a readable catalog summary.",
    requirements: [
      "Return `<name> - ₱<price> - <stock> stocks` when price is a finite number.",
      "Use `Price unavailable` in place of the peso price when price is invalid.",
      "Return an empty array for non-array input and do not mutate the products.",
    ],
    examples: [
      { input: 'createProductSummaries([{ name: "Laptop", price: 45000, stock: 5 }])', output: '["Laptop - ₱45000 - 5 stocks"]' },
      { input: 'createProductSummaries([{ name: "Headset", price: null, stock: 8 }])', output: '["Headset - Price unavailable - 8 stocks"]' },
    ],
    functionName: "createProductSummaries",
    starter: `function createProductSummaries(products) {
  // Map every product to one readable summary string
}
`,
    hints: [
      "Use `map()` because every product produces exactly one string.",
      "Choose the price label with `Number.isFinite(product.price)`.",
      "A template literal can combine `product.name`, the price label, and `product.stock`.",
    ],
    tests: [
      {
        label: "formats the full catalog",
        args: [PRODUCTS],
        expected: [
          "Laptop - ₱45000 - 5 stocks",
          "Mouse - ₱700 - 0 stocks",
          "Keyboard - ₱1500 - 10 stocks",
          "Monitor - ₱12000 - 3 stocks",
          "Headset - Price unavailable - 8 stocks",
          "Webcam - ₱2500 - 0 stocks",
        ],
        noMutation: true,
      },
      { label: "accepts a zero price", args: [[{ name: "Sample", price: 0, stock: 1 }]], expected: ["Sample - ₱0 - 1 stocks"], noMutation: true },
      { label: "handles an empty catalog", args: [[]], expected: [] },
      { label: "rejects non-array input", args: [null], expected: [], hidden: true },
    ],
  },
];
