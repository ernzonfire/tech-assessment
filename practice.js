import { challenges } from "./practice-challenges.js";

const SOLVED_KEY = "mern-grind.practice.solved";
const CODE_KEY_PREFIX = "mern-grind.practice.code.";

const elements = {
  challengeList: document.querySelector("#challenge-list"),
  rank: document.querySelector("#challenge-rank"),
  category: document.querySelector("#challenge-category"),
  points: document.querySelector("#challenge-points"),
  number: document.querySelector("#challenge-number"),
  title: document.querySelector("#challenge-title"),
  description: document.querySelector("#challenge-description"),
  requirements: document.querySelector("#challenge-requirements"),
  examples: document.querySelector("#challenge-examples"),
  concept: document.querySelector("#challenge-concept"),
  conceptReference: document.querySelector("#concept-reference"),
  hintButton: document.querySelector("#reveal-hint"),
  hintList: document.querySelector("#hint-list"),
  editor: document.querySelector("#code-editor"),
  lineNumbers: document.querySelector("#line-numbers"),
  solutionTab: document.querySelector("#solution-tab"),
  testsTab: document.querySelector("#tests-tab"),
  solutionView: document.querySelector("#solution-view"),
  testsView: document.querySelector("#tests-view"),
  resetButton: document.querySelector("#reset-code"),
  runButton: document.querySelector("#run-code"),
  submitButton: document.querySelector("#submit-code"),
  resultsHeading: document.querySelector("#results-heading"),
  runSummary: document.querySelector("#run-summary"),
  testResults: document.querySelector("#test-results"),
  consoleOutput: document.querySelector("#console-output"),
  solvedCount: document.querySelector("#solved-count"),
  pointCount: document.querySelector("#point-count"),
  progressBar: document.querySelector("#sidebar-progress-bar"),
};

let currentChallenge = challenges[0];
let currentWorker = null;
let currentHintCount = 0;

function loadSolved() {
  try {
    const saved = JSON.parse(localStorage.getItem(SOLVED_KEY) ?? "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

const solved = loadSolved();

function saveSolved() {
  localStorage.setItem(SOLVED_KEY, JSON.stringify([...solved]));
}

function appendFormattedText(container, text) {
  const parts = text.split(/(`[^`]+`)/g);
  for (const part of parts) {
    if (part.startsWith("`") && part.endsWith("`")) {
      const code = document.createElement("code");
      code.textContent = part.slice(1, -1);
      container.append(code);
    } else {
      container.append(document.createTextNode(part));
    }
  }
}

function formatValue(value) {
  if (value && typeof value === "object" && value.__special) return value.__special;
  if (Array.isArray(value)) return `[${value.map(formatValue).join(", ")}]`;
  if (typeof value === "string") return JSON.stringify(value);
  if (value === undefined) return "undefined";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function referenceFor(challenge) {
  const concept = challenge.concept.toLowerCase();
  if (concept.includes("trim")) return "./index.html#ref-trim";
  if (concept.includes("if")) return "./index.html#ref-if";
  if (concept.includes("set")) return "./index.html#ref-new-set";
  if (concept.includes("reduce")) return "./index.html#ref-reduce";
  if (concept.includes("array")) return "./index.html#ref-array-isarray";
  if (concept.includes("spread")) return "./index.html#ref-spread-rest";
  return "./index.html#ref-function";
}

function renderChallengeList() {
  elements.challengeList.replaceChildren();
  let currentGroup = "";
  challenges.forEach((challenge, index) => {
    const group = challenge.drill?.label ?? "Foundation Mix";
    if (group !== currentGroup) {
      const groupLabel = document.createElement("p");
      groupLabel.className = "challenge-group-label";
      groupLabel.textContent = challenge.drill ? `${group} · ${challenge.drill.total} variations` : group;
      elements.challengeList.append(groupLabel);
      currentGroup = group;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "challenge-button";
    button.classList.toggle("active", challenge.id === currentChallenge.id);
    button.classList.toggle("solved", solved.has(challenge.id));
    button.setAttribute("aria-current", challenge.id === currentChallenge.id ? "true" : "false");

    const number = document.createElement("span");
    number.className = "challenge-index";
    number.textContent = String(index + 1).padStart(2, "0");

    const label = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = challenge.title;
    const meta = document.createElement("small");
    meta.textContent = challenge.drill
      ? `Rep ${challenge.drill.step}/${challenge.drill.total} · ${challenge.rank}`
      : `${challenge.rank} · ${challenge.category}`;
    label.append(title, meta);

    const state = document.createElement("span");
    state.className = "challenge-state";
    state.textContent = "✓";
    state.setAttribute("aria-label", solved.has(challenge.id) ? "Solved" : "Not solved");

    button.append(number, label, state);
    button.addEventListener("click", () => selectChallenge(challenge, { updateUrl: true }));
    elements.challengeList.append(button);
  });
}

function updateProgress() {
  const completed = challenges.filter((challenge) => solved.has(challenge.id));
  const points = completed.reduce((sum, challenge) => sum + challenge.points, 0);
  elements.solvedCount.textContent = `${completed.length} / ${challenges.length} solved`;
  elements.pointCount.textContent = String(points);
  elements.progressBar.style.width = `${(completed.length / challenges.length) * 100}%`;
  elements.submitButton.textContent = solved.has(currentChallenge.id) ? "Solved ✓ · Run again" : "Submit solution";
}

function renderRequirements(challenge) {
  elements.requirements.replaceChildren();
  for (const requirement of challenge.requirements) {
    const item = document.createElement("li");
    appendFormattedText(item, requirement);
    elements.requirements.append(item);
  }
}

function renderExamples(challenge) {
  elements.examples.replaceChildren();
  for (const example of challenge.examples) {
    const row = document.createElement("div");
    row.className = "example-row";
    const input = document.createElement("code");
    input.textContent = example.input;
    const output = document.createElement("span");
    output.textContent = `→ ${example.output}`;
    row.append(input, output);
    elements.examples.append(row);
  }
}

function renderVisibleTests(challenge) {
  elements.testsView.replaceChildren();
  const visibleTests = challenge.tests.filter((test) => !test.hidden);
  for (const test of visibleTests) {
    const item = document.createElement("article");
    item.className = "visible-test";
    const title = document.createElement("strong");
    title.textContent = test.label;
    const code = document.createElement("code");
    code.textContent = `${challenge.functionName}(${test.args.map(formatValue).join(", ")})\nExpected: ${formatValue(test.expected)}`;
    item.append(title, code);
    elements.testsView.append(item);
  }

  if (challenge.tests.some((test) => test.hidden)) {
    const hidden = document.createElement("article");
    hidden.className = "visible-test";
    const title = document.createElement("strong");
    title.textContent = "Hidden edge cases";
    const detail = document.createElement("code");
    detail.textContent = "These run during testing but their inputs stay hidden.";
    hidden.append(title, detail);
    elements.testsView.append(hidden);
  }
}

function updateLineNumbers() {
  const lineCount = elements.editor.value.split("\n").length;
  elements.lineNumbers.textContent = Array.from({ length: lineCount }, (_, index) => index + 1).join("\n");
}

function clearResults() {
  elements.resultsHeading.textContent = "Ready";
  elements.runSummary.textContent = "Run your code against the cases below.";
  elements.testResults.innerHTML = '<div class="runner-empty"><strong>No run yet</strong><span>Your code runs in an isolated worker with a 2-second limit.</span></div>';
  elements.consoleOutput.hidden = true;
  elements.consoleOutput.querySelector("pre").textContent = "";
}

function selectChallenge(challenge, { updateUrl = false } = {}) {
  if (currentWorker) {
    currentWorker.terminate();
    currentWorker = null;
  }

  currentChallenge = challenge;
  currentHintCount = 0;
  elements.rank.textContent = challenge.rank;
  elements.category.textContent = challenge.category;
  elements.points.textContent = `+${challenge.points} XP`;
  elements.number.textContent = challenge.drill
    ? `${challenge.drill.label} · Rep ${challenge.drill.step} of ${challenge.drill.total}`
    : `Challenge ${String(challenges.indexOf(challenge) + 1).padStart(2, "0")}`;
  elements.title.textContent = challenge.title;
  elements.description.textContent = challenge.description;
  elements.concept.textContent = challenge.concept;
  elements.conceptReference.href = referenceFor(challenge);
  elements.hintList.replaceChildren();
  elements.hintButton.textContent = "Show hint";
  elements.hintButton.disabled = false;
  renderRequirements(challenge);
  renderExamples(challenge);
  renderVisibleTests(challenge);

  const savedCode = localStorage.getItem(`${CODE_KEY_PREFIX}${challenge.id}`);
  elements.editor.value = savedCode ?? challenge.starter;
  updateLineNumbers();
  clearResults();
  showTab("solution");
  renderChallengeList();
  updateProgress();

  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set("challenge", challenge.id);
    history.pushState({ challenge: challenge.id }, "", url);
  }
}

function showTab(tab) {
  const solutionActive = tab === "solution";
  elements.solutionTab.classList.toggle("active", solutionActive);
  elements.solutionTab.setAttribute("aria-selected", String(solutionActive));
  elements.testsTab.classList.toggle("active", !solutionActive);
  elements.testsTab.setAttribute("aria-selected", String(!solutionActive));
  elements.solutionView.hidden = !solutionActive;
  elements.testsView.hidden = solutionActive;
  if (solutionActive) elements.editor.focus();
}

function setRunning(running) {
  elements.runButton.disabled = running;
  elements.submitButton.disabled = running;
  elements.resetButton.disabled = running;
  if (running) {
    elements.resultsHeading.textContent = "Running…";
    elements.runSummary.textContent = "Executing in the sandbox.";
  }
}

function renderLogs(logs) {
  elements.consoleOutput.hidden = logs.length === 0;
  elements.consoleOutput.querySelector("pre").textContent = logs.join("\n");
}

function createResultRow(result) {
  const row = document.createElement("article");
  row.className = `test-result ${result.passed ? "passed" : "failed"}`;

  const icon = document.createElement("span");
  icon.className = "result-icon";
  icon.textContent = result.passed ? "✓" : "×";

  const content = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = result.hidden ? `Hidden edge case · ${result.passed ? "passed" : "failed"}` : result.label;
  content.append(title);

  if (!result.hidden && !result.passed) {
    const details = document.createElement("p");
    details.textContent = `Expected: ${result.expected}\nReceived: ${result.actual}`;
    content.append(details);
  }

  if (result.hidden && !result.passed && result.failureHint) {
    const hint = document.createElement("p");
    hint.className = "edge-case-hint";
    hint.textContent = `Edge-case hint: ${result.failureHint}`;
    content.append(hint);
  }

  if (result.mutationError) {
    const mutation = document.createElement("p");
    mutation.className = "mutation-error";
    mutation.textContent = "Input was mutated. Return a new value instead.";
    content.append(mutation);
  }

  row.append(icon, content);
  return row;
}

function renderRunResults(message, submitAfterPass, challengeAtStart) {
  const { results, logs } = message;
  const passed = results.filter((result) => result.passed).length;
  const allPassed = passed === results.length;
  elements.resultsHeading.textContent = allPassed ? "All tests passed" : `${results.length - passed} test${results.length - passed === 1 ? "" : "s"} failed`;
  elements.runSummary.textContent = `${passed} / ${results.length} passing`;
  elements.testResults.replaceChildren(...results.map(createResultRow));
  renderLogs(logs);

  if (!allPassed && submitAfterPass) {
    const failedCount = results.length - passed;
    elements.resultsHeading.textContent = "Submission blocked";
    elements.runSummary.textContent = `${failedCount} test${failedCount === 1 ? "" : "s"} must still pass`;

    const banner = document.createElement("div");
    banner.className = "submission-blocked";
    const title = document.createElement("strong");
    title.textContent = `Not submitted · ${failedCount} failing test${failedCount === 1 ? "" : "s"}`;
    const detail = document.createElement("span");
    detail.textContent = "A solution is marked solved only when every visible and hidden edge case passes. Fix the failed case, then Submit again.";
    banner.append(title, detail);
    elements.testResults.prepend(banner);
  }

  if (allPassed && submitAfterPass) {
    solved.add(challengeAtStart.id);
    saveSolved();
    const banner = document.createElement("div");
    banner.className = "success-banner";
    const title = document.createElement("strong");
    title.textContent = `Challenge solved · +${challengeAtStart.points} XP`;
    const detail = document.createElement("span");
    detail.textContent = "Your code and progress are saved in this browser.";
    banner.append(title, detail);
    elements.testResults.prepend(banner);
    renderChallengeList();
    updateProgress();
  }
}

function renderCompileError(message) {
  elements.resultsHeading.textContent = "Code error";
  elements.runSummary.textContent = "Fix the error and run again.";
  const error = document.createElement("div");
  error.className = "compile-error";
  error.textContent = message;
  elements.testResults.replaceChildren(error);
}

function runCode({ submitAfterPass = false } = {}) {
  if (currentWorker) currentWorker.terminate();
  const challengeAtStart = currentChallenge;
  const codeAtStart = elements.editor.value;
  localStorage.setItem(`${CODE_KEY_PREFIX}${challengeAtStart.id}`, codeAtStart);
  setRunning(true);

  currentWorker = new Worker("./runner-worker.js?v=2");
  const timeout = setTimeout(() => {
    currentWorker?.terminate();
    currentWorker = null;
    setRunning(false);
    renderCompileError("Execution stopped after 2 seconds. Check for an infinite loop or work that never finishes.");
  }, 2000);

  currentWorker.addEventListener("message", (event) => {
    clearTimeout(timeout);
    currentWorker?.terminate();
    currentWorker = null;
    setRunning(false);

    if (event.data.type === "compile-error") {
      renderCompileError(event.data.message);
      renderLogs(event.data.logs ?? []);
      return;
    }

    renderRunResults(event.data, submitAfterPass, challengeAtStart);
  }, { once: true });

  currentWorker.addEventListener("error", (event) => {
    clearTimeout(timeout);
    currentWorker?.terminate();
    currentWorker = null;
    setRunning(false);
    renderCompileError(event.message || "The runner could not execute this code.");
  }, { once: true });

  currentWorker.postMessage({
    code: codeAtStart,
    functionName: challengeAtStart.functionName,
    tests: challengeAtStart.tests,
  });
}

elements.editor.addEventListener("input", () => {
  updateLineNumbers();
  localStorage.setItem(`${CODE_KEY_PREFIX}${currentChallenge.id}`, elements.editor.value);
});

elements.editor.addEventListener("scroll", () => {
  elements.lineNumbers.scrollTop = elements.editor.scrollTop;
});

elements.editor.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = elements.editor.selectionStart;
    const end = elements.editor.selectionEnd;
    elements.editor.setRangeText("  ", start, end, "end");
    elements.editor.dispatchEvent(new Event("input"));
  }

  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    runCode();
  }
});

elements.solutionTab.addEventListener("click", () => showTab("solution"));
elements.testsTab.addEventListener("click", () => showTab("tests"));
elements.runButton.addEventListener("click", () => runCode());
elements.submitButton.addEventListener("click", () => runCode({ submitAfterPass: true }));

elements.resetButton.addEventListener("click", () => {
  if (!confirm("Reset this challenge to its starter code? Your current code for this challenge will be replaced.")) return;
  elements.editor.value = currentChallenge.starter;
  localStorage.removeItem(`${CODE_KEY_PREFIX}${currentChallenge.id}`);
  updateLineNumbers();
  clearResults();
  elements.editor.focus();
});

elements.hintButton.addEventListener("click", () => {
  const hint = currentChallenge.hints[currentHintCount];
  if (!hint) return;
  const item = document.createElement("li");
  appendFormattedText(item, hint);
  elements.hintList.append(item);
  currentHintCount += 1;
  if (currentHintCount >= currentChallenge.hints.length) {
    elements.hintButton.textContent = "All hints shown";
    elements.hintButton.disabled = true;
  } else {
    elements.hintButton.textContent = "Next hint";
  }
});

window.addEventListener("popstate", () => {
  const challengeId = new URL(location.href).searchParams.get("challenge");
  const challenge = challenges.find((candidate) => candidate.id === challengeId) ?? challenges[0];
  selectChallenge(challenge);
});

const initialId = new URL(location.href).searchParams.get("challenge");
const initialChallenge = challenges.find((challenge) => challenge.id === initialId) ?? challenges[0];
selectChallenge(initialChallenge);
