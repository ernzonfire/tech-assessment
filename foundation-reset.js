const PROGRESS_KEY = "mern-grind.foundation-reset.progress";

const progressInputs = [...document.querySelectorAll("[data-progress], [data-day]")];
const progressLabel = document.querySelector("#header-progress-label");
const progressBar = document.querySelector("#header-progress-bar");

function progressId(input) {
  return input.dataset.progress ? `lesson:${input.dataset.progress}` : `day:${input.dataset.day}`;
}

function readSavedProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    localStorage.removeItem(PROGRESS_KEY);
    return new Set();
  }
}

const completed = readSavedProgress();

function renderProgress() {
  for (const input of progressInputs) input.checked = completed.has(progressId(input));
  const done = progressInputs.filter((input) => input.checked).length;
  const total = progressInputs.length;
  progressLabel.textContent = `${done} / ${total} done`;
  progressBar.style.width = `${total ? (done / total) * 100 : 0}%`;
}

for (const input of progressInputs) {
  input.addEventListener("change", () => {
    const id = progressId(input);
    if (input.checked) completed.add(id);
    else completed.delete(id);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...completed]));
    renderProgress();
  });
}

renderProgress();

const traceSteps = [
  {
    line: 21,
    title: "Start at the function call",
    explanation: "The declarations above prepare reusable functions. The program starts running when main() is called.",
    value: "main = function",
    next: "Enter the body of main.",
  },
  {
    line: 20,
    title: "Create the source array",
    explanation: "Inside main, items receives an array. Each position contains one object with a name and rating.",
    value: "items = Array(10)",
    next: "Call searchValidItems(items).",
  },
  {
    line: 1,
    title: "An argument enters a parameter",
    explanation: "The items argument is passed into searchValidItems. Inside the helper, the receiving parameter is named array.",
    value: "array = items",
    next: "Run filter once for every item.",
  },
  {
    line: 3,
    title: "Filter checks Item A",
    explanation: "For Item A, item.rating is 5. Number.isFinite(5) returns true, so Item A stays.",
    value: "item = { name: Item A, rating: 5 } → true",
    next: "Repeat the callback for the next object.",
  },
  {
    line: 3,
    title: "Filter rejects Item D",
    explanation: "For Item D, item.rating is null. Number.isFinite(null) returns false, so Item D is removed.",
    value: "item = { name: Item D, rating: null } → false",
    next: "Finish the remaining filter iterations.",
  },
  {
    line: 2,
    title: "Filter returns a new array",
    explanation: "The callback has now inspected every object. The returned array contains all numeric ratings, including zero.",
    value: "validItems = Array(9)",
    next: "Pass validItems into sortByRating.",
  },
  {
    line: 8,
    title: "Copy before sorting",
    explanation: "Spread creates a shallow array copy. Sort changes the copy, so validItems keeps its original order.",
    value: "[...array] = new Array(9)",
    next: "Compare ratings two at a time.",
  },
  {
    line: 9,
    title: "Sort highest to lowest",
    explanation: "The b.rating - a.rating comparator produces descending order. A positive result moves b before a.",
    value: "sortedItems ratings = 5, 5, 4, 4, 3, 3, 2, 1, 0",
    next: "Search for Item A in validItems.",
  },
  {
    line: 15,
    title: "Find compares the name property",
    explanation: "itemName is a string. item is an object. The compatible comparison is item.name === itemName.",
    value: '"Item A" === "Item A" → true',
    next: "Return the matching object's rating.",
  },
  {
    line: 17,
    title: "Return the final rating",
    explanation: "A matching object exists, so the conditional expression returns item.rating. The caller stores the number 5.",
    value: "ratingOfItemA = 5",
    next: "Explain the complete input → process → output flow aloud.",
  },
];

const traceLines = [...document.querySelectorAll(".trace-code [data-line]")];
const traceCounter = document.querySelector("#trace-counter");
const traceTitle = document.querySelector("#trace-title");
const traceExplanation = document.querySelector("#trace-explanation");
const traceValue = document.querySelector("#trace-value");
const traceNext = document.querySelector("#trace-next");
const nextTraceButton = document.querySelector("#next-trace");
const resetTraceButton = document.querySelector("#reset-trace");
let traceIndex = 0;

function renderTrace() {
  const step = traceSteps[traceIndex];
  for (const line of traceLines) line.classList.toggle("active", Number(line.dataset.line) === step.line);
  traceCounter.textContent = `Step ${traceIndex + 1} of ${traceSteps.length}`;
  traceTitle.textContent = step.title;
  traceExplanation.textContent = step.explanation;
  traceValue.textContent = step.value;
  traceNext.textContent = step.next;
  nextTraceButton.textContent = traceIndex === traceSteps.length - 1 ? "Trace complete · Restart" : "Next step";
}

nextTraceButton.addEventListener("click", () => {
  traceIndex = traceIndex === traceSteps.length - 1 ? 0 : traceIndex + 1;
  renderTrace();
});

resetTraceButton.addEventListener("click", () => {
  traceIndex = 0;
  renderTrace();
});

renderTrace();

for (const quiz of document.querySelectorAll(".quick-check")) {
  const correct = quiz.dataset.correct;
  const feedback = quiz.querySelector(".quiz-feedback");
  const buttons = [...quiz.querySelectorAll("[data-answer]")];

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const isCorrect = button.dataset.answer === correct;
      for (const candidate of buttons) candidate.classList.remove("correct", "wrong");
      button.classList.add(isCorrect ? "correct" : "wrong");
      feedback.classList.toggle("success", isCorrect);
      feedback.textContent = isCorrect
        ? "Correct. Explain why in one sentence before moving on."
        : "Not yet. Label the input and output shape, then try again.";
    });
  }
}

const navLinks = [...document.querySelectorAll(".lesson-nav a")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  for (const link of navLinks) {
    const active = link.getAttribute("href") === `#${visible.target.id}`;
    link.toggleAttribute("aria-current", active);
  }
}, { rootMargin: "-25% 0px -65%", threshold: [0, 0.2, 0.5] });

for (const section of observedSections) sectionObserver.observe(section);
