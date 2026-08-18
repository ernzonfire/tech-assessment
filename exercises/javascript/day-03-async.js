/**
 * DAY 3 — Async JavaScript
 * Run: npm run test:day3
 */

/** Return a promise that fulfills with `value` after `milliseconds`. */
export function delay(milliseconds, value) {
  // TODO
}

/**
 * Fetch and parse JSON.
 * Throw Error("HTTP <status>") when response.ok is false.
 * `fetchImpl` is injected so the function is easy to test.
 */
export async function fetchJson(url, fetchImpl = fetch) {
  // TODO
}

/**
 * Load user and tasks in parallel and return { user, tasks }.
 * Each loader is a zero-argument function returning a promise.
 */
export async function loadDashboard(loadUser, loadTasks) {
  // TODO
}

/**
 * Run an async operation until it succeeds, up to maxAttempts total calls.
 * Throw the last error after the final failure.
 * Throw RangeError when maxAttempts is not a positive integer.
 */
export async function retry(operation, maxAttempts = 3) {
  // TODO
}

/**
 * Given promise-returning task functions, return results for all tasks without
 * failing fast: [{ status: "fulfilled", value }, { status: "rejected", reason }].
 * Tasks should begin without waiting for earlier tasks to finish.
 */
export async function settleTasks(tasks) {
  // TODO
}

