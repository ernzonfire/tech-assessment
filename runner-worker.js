function reviveSpecial(value) {
  if (Array.isArray(value)) return value.map(reviveSpecial);
  if (value && typeof value === "object") {
    if (value.__special === "NaN") return NaN;
    if (value.__special === "Infinity") return Infinity;
    if (value.__special === "-Infinity") return -Infinity;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, reviveSpecial(item)]));
  }
  return value;
}

function normalizeForDisplay(value) {
  if (Number.isNaN(value)) return "NaN";
  if (value === Infinity) return "Infinity";
  if (value === -Infinity) return "-Infinity";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return JSON.stringify(value);
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function equal(left, right) {
  if (Object.is(left, right)) return true;
  if (typeof left !== typeof right || left === null || right === null) return false;
  if (typeof left !== "object") return false;
  if (Array.isArray(left) !== Array.isArray(right)) return false;

  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) return false;
  return leftKeys.every((key) => Object.hasOwn(right, key) && equal(left[key], right[key]));
}

self.addEventListener("message", async (event) => {
  const { code, functionName, tests } = event.data;
  const logs = [];
  const safeConsole = {
    log: (...values) => logs.push(values.map(normalizeForDisplay).join(" ")),
    warn: (...values) => logs.push(`[warn] ${values.map(normalizeForDisplay).join(" ")}`),
    error: (...values) => logs.push(`[error] ${values.map(normalizeForDisplay).join(" ")}`),
  };

  try {
    const factory = new Function(
      "console",
      "fetch",
      "XMLHttpRequest",
      "WebSocket",
      "importScripts",
      `"use strict";\n${code}\nif (typeof ${functionName} !== "function") {\n  throw new Error("Expected a function named ${functionName}");\n}\nreturn ${functionName};`,
    );
    const solution = factory(safeConsole, undefined, undefined, undefined, undefined);
    const results = [];

    for (const test of tests) {
      const args = reviveSpecial(structuredClone(test.args));
      const expected = reviveSpecial(structuredClone(test.expected));
      const before = structuredClone(args);
      let actual;
      let error = null;

      try {
        actual = await solution(...args);
      } catch (caught) {
        error = caught instanceof Error ? caught.message : String(caught);
      }

      const valuePassed = !error && equal(actual, expected);
      const mutationPassed = !test.noMutation || equal(args, before);
      results.push({
        label: test.label,
        hidden: Boolean(test.hidden),
        passed: valuePassed && mutationPassed,
        expected: normalizeForDisplay(expected),
        actual: error ? `Error: ${error}` : normalizeForDisplay(actual),
        mutationError: !mutationPassed,
        failureHint: test.failureHint ?? "",
      });
    }

    self.postMessage({ type: "complete", results, logs });
  } catch (error) {
    self.postMessage({
      type: "compile-error",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : "",
      logs,
    });
  }
});
