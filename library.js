import {
  REFERENCE_TERMS,
  SYNTAX_REFERENCE,
  referenceSlug,
} from "./syntax-reference.js";

const cards = [...document.querySelectorAll(".syntax-card")];
const search = document.querySelector("#syntax-search");
const resultCount = document.querySelector("#result-count");
const emptyResults = document.querySelector("#empty-results");
const roadmapButtons = [...document.querySelectorAll(".roadmap-item")];
const progressBoxes = [...document.querySelectorAll("[data-progress]")];
const tooltip = document.querySelector("#reference-tooltip");
const referenceDialog = document.querySelector("#reference-dialog");
const glossaryDetails = document.querySelector("#glossary-details");
const glossaryGrid = document.querySelector("#glossary-grid");
const cardCode = new WeakMap();
const cardTerms = new WeakMap();

let activeCategory = "all";
let activeReferenceHash = "";
let glossaryButtons = [];

function updateLibrary() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  let visibleTerms = 0;

  for (const card of cards) {
    const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
    const searchableText = `${card.dataset.title} ${card.textContent}`.toLowerCase();
    const matchesSearch = !query || searchableText.includes(query);
    card.hidden = !(matchesCategory && matchesSearch);
    if (!card.hidden) visible += 1;
  }

  for (const button of glossaryButtons) {
    const matchesSearch = !query || button.dataset.search.includes(query);
    button.hidden = !matchesSearch;
    if (matchesSearch) visibleTerms += 1;
  }

  if (query) glossaryDetails.open = true;
  resultCount.textContent = `${visible} example${visible === 1 ? "" : "s"} · ${visibleTerms} term${visibleTerms === 1 ? "" : "s"}`;
  emptyResults.hidden = visible !== 0 || visibleTerms !== 0;
}

function buildGlossaryIndex() {
  const fragment = document.createDocumentFragment();
  const alphabeticalTerms = [...REFERENCE_TERMS].sort((left, right) => left.localeCompare(right));

  for (const term of alphabeticalTerms) {
    const reference = SYNTAX_REFERENCE[term];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "glossary-item";
    button.dataset.search = `${term} ${reference.category} ${reference.short} ${reference.meaning}`.toLowerCase();

    const heading = document.createElement("span");
    const code = document.createElement("code");
    code.textContent = term;
    const category = document.createElement("small");
    category.textContent = reference.category;
    heading.append(code, category);

    const description = document.createElement("p");
    description.textContent = reference.short;
    button.append(heading, description);
    button.addEventListener("click", () => openReference(term));
    fragment.append(button);
  }

  glossaryGrid.replaceChildren(fragment);
  glossaryButtons = [...glossaryGrid.querySelectorAll(".glossary-item")];
  document.querySelector("#glossary-count").textContent = `${glossaryButtons.length} entries`;
}

function setCategory(category) {
  activeCategory = category;
  for (const button of roadmapButtons) {
    button.classList.toggle("active", button.dataset.filter === category);
  }
  updateLibrary();
}

for (const button of roadmapButtons) {
  button.addEventListener("click", () => {
    setCategory(button.dataset.filter);
    document.querySelector("#library-heading").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

search.addEventListener("input", updateLibrary);
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== search && !referenceDialog.open) {
    event.preventDefault();
    search.focus();
  }
});

for (const button of document.querySelectorAll(".copy-button")) {
  button.addEventListener("click", async () => {
    const code = button.closest(".syntax-card").querySelector("pre code").textContent;
    await navigator.clipboard.writeText(code);
    const previous = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => { button.textContent = previous; }, 1200);
  });
}

function updateProgress() {
  const completed = progressBoxes.filter((box) => box.checked).length;
  document.querySelector("#progress-bar").style.width = `${(completed / progressBoxes.length) * 100}%`;
  document.querySelector("#progress-label").textContent = `${completed} of ${progressBoxes.length} steps done`;
  const state = Object.fromEntries(progressBoxes.map((box) => [box.dataset.progress, box.checked]));
  localStorage.setItem("js-grind.day1-progress", JSON.stringify(state));
}

try {
  const saved = JSON.parse(localStorage.getItem("js-grind.day1-progress") ?? "{}");
  for (const box of progressBoxes) box.checked = Boolean(saved[box.dataset.progress]);
} catch {
  localStorage.removeItem("js-grind.day1-progress");
}

for (const box of progressBoxes) box.addEventListener("change", updateProgress);

document.querySelector("#show-foundations").addEventListener("click", () => {
  search.value = "";
  setCategory("basics");
  document.querySelector("#library-heading").scrollIntoView({ behavior: "smooth", block: "start" });
});

function isIdentifierCharacter(character) {
  return Boolean(character && /[a-zA-Z0-9_$]/.test(character));
}

function termFitsAt(text, index, term) {
  const before = text[index - 1];
  const after = text[index + term.length];
  if (isIdentifierCharacter(term[0]) && isIdentifierCharacter(before)) return false;
  if (isIdentifierCharacter(term.at(-1)) && isIdentifierCharacter(after)) return false;
  return true;
}

function isCodePosition(text, targetIndex) {
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = 0; index < targetIndex; index += 1) {
    const character = text[index];
    const next = text[index + 1];

    if (lineComment) {
      if (character === "\n") lineComment = false;
      continue;
    }

    if (blockComment) {
      if (character === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === "\"" || character === "'" || character === "`") {
      quote = character;
    } else if (character === "/" && next === "/") {
      lineComment = true;
      index += 1;
    } else if (character === "/" && next === "*") {
      blockComment = true;
      index += 1;
    }
  }

  return !quote && !lineComment && !blockComment;
}

function nextReferenceIn(text, startIndex) {
  let bestMatch = null;

  for (const term of REFERENCE_TERMS) {
    let index = text.indexOf(term, startIndex);
    while (index !== -1 && (!termFitsAt(text, index, term) || !isCodePosition(text, index))) {
      index = text.indexOf(term, index + 1);
    }

    if (index === -1) continue;
    if (!bestMatch || index < bestMatch.index || (index === bestMatch.index && term.length > bestMatch.term.length)) {
      bestMatch = { index, term };
    }
  }

  return bestMatch;
}

function termsIn(text) {
  const found = [];
  let position = 0;

  while (position < text.length) {
    const match = nextReferenceIn(text, position);
    if (!match) break;
    if (!found.includes(match.term)) found.push(match.term);
    position = match.index + match.term.length;
  }

  return found;
}

function positionTooltip(token) {
  const rect = token.getBoundingClientRect();
  const margin = 10;
  const maxLeft = window.innerWidth - tooltip.offsetWidth - margin;
  const left = Math.max(margin, Math.min(rect.left + (rect.width - tooltip.offsetWidth) / 2, maxLeft));
  let top = rect.top - tooltip.offsetHeight - 9;
  if (top < margin) top = rect.bottom + 9;
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function showTooltip(token) {
  const term = token.dataset.referenceTerm;
  const reference = SYNTAX_REFERENCE[term];
  tooltip.textContent = `${term} — ${reference.short} Click for full reference.`;
  tooltip.hidden = false;
  positionTooltip(token);
}

function hideTooltip() {
  tooltip.hidden = true;
}

function createReferenceToken(term) {
  const reference = SYNTAX_REFERENCE[term];
  const token = document.createElement("span");
  token.className = "syntax-token";
  token.tabIndex = 0;
  token.role = "link";
  token.dataset.referenceTerm = term;
  token.setAttribute("aria-label", `${term}: ${reference.short}`);
  token.textContent = term;
  token.addEventListener("pointerenter", () => showTooltip(token));
  token.addEventListener("pointerleave", hideTooltip);
  token.addEventListener("focus", () => showTooltip(token));
  token.addEventListener("blur", hideTooltip);
  token.addEventListener("click", () => openReference(term));
  token.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openReference(term);
    }
  });
  return token;
}

function annotateCode(codeElement) {
  const source = codeElement.textContent;
  const fragment = document.createDocumentFragment();
  let position = 0;

  while (position < source.length) {
    const match = nextReferenceIn(source, position);
    if (!match) {
      fragment.append(document.createTextNode(source.slice(position)));
      break;
    }

    if (match.index > position) {
      fragment.append(document.createTextNode(source.slice(position, match.index)));
    }
    fragment.append(createReferenceToken(match.term));
    position = match.index + match.term.length;
  }

  codeElement.replaceChildren(fragment);
  return source;
}

function updateDialogHash(hash) {
  activeReferenceHash = hash;
  history.replaceState(null, "", `${location.pathname}${location.search}${hash}`);
}

function showDialog() {
  hideTooltip();
  if (!referenceDialog.open) referenceDialog.showModal();
}

function setDialogText(selector, value) {
  document.querySelector(selector).textContent = value;
}

function openReference(term, { updateHash = true } = {}) {
  const reference = SYNTAX_REFERENCE[term];
  if (!reference) return;

  setDialogText("#reference-category", reference.category);
  setDialogText("#reference-title", term);
  setDialogText("#reference-summary", reference.short);
  setDialogText("#reference-meaning-heading", "Meaning");
  setDialogText("#reference-meaning", reference.meaning);
  setDialogText("#reference-code-heading", "Syntax pattern");
  setDialogText("#reference-code", reference.pattern);
  setDialogText("#reference-example", reference.example);
  document.querySelector("#reference-example-section").hidden = false;
  document.querySelector("#reference-terms-section").hidden = true;
  if (updateHash) updateDialogHash(`#ref-${referenceSlug(term)}`);
  showDialog();
}

function explainLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return { explanation: "Blank line separates ideas for readability.", terms: [] };
  if (/^\/\//.test(trimmed)) return { explanation: "A comment for humans; JavaScript does not execute it.", terms: [] };
  if (/^[}\]);,]+$/.test(trimmed)) return { explanation: "Closes the current block, call, array, or object.", terms: [] };

  const terms = termsIn(line);
  if (!terms.length) return { explanation: "A value or operation used by this example.", terms };

  return {
    explanation: terms.map((term) => `${term}: ${SYNTAX_REFERENCE[term].short}`).join(" "),
    terms,
  };
}

function createLineBreakdown(line, lineNumber) {
  const { explanation, terms } = explainLine(line);
  const row = document.createElement("div");
  row.className = "breakdown-line";

  const code = document.createElement("code");
  code.textContent = `${lineNumber}. ${line || " "}`;
  row.append(code);

  const description = document.createElement("p");
  description.textContent = explanation;
  row.append(description);

  if (terms.length) {
    const links = document.createElement("div");
    links.className = "term-links";
    for (const term of terms) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `Open ${term}`;
      button.addEventListener("click", () => openReference(term));
      links.append(button);
    }
    row.append(links);
  }

  return row;
}

function cardSlug(card) {
  return card.querySelector("h3").textContent
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function openBreakdown(card, { updateHash = true } = {}) {
  const title = card.querySelector("h3").textContent;
  const category = card.querySelector("header > span").textContent;
  const summary = card.querySelector(":scope > p")?.textContent ?? "Code walkthrough";
  const source = cardCode.get(card) ?? card.querySelector("pre code").textContent;

  setDialogText("#reference-category", `${category} · Code walkthrough`);
  setDialogText("#reference-title", `Breakdown: ${title}`);
  setDialogText("#reference-summary", summary);
  setDialogText("#reference-meaning-heading", "What this snippet does");
  setDialogText("#reference-meaning", "Read it from top to bottom. Each line below explains the syntax that controls the program flow or transforms the data.");
  setDialogText("#reference-code-heading", "Complete snippet");
  setDialogText("#reference-code", source);
  document.querySelector("#reference-example-section").hidden = true;
  document.querySelector("#reference-terms-section").hidden = false;
  setDialogText("#reference-terms-heading", "Line-by-line breakdown");

  const container = document.querySelector("#reference-terms");
  container.replaceChildren(...source.split("\n").map((line, index) => createLineBreakdown(line, index + 1)));

  if (updateHash) updateDialogHash(`#breakdown-${cardSlug(card)}`);
  showDialog();
}

function addBreakdownControls() {
  for (const card of cards) {
    const codeElement = card.querySelector("pre code");
    const source = annotateCode(codeElement);
    cardCode.set(card, source);
    cardTerms.set(card, termsIn(source));

    const button = document.createElement("button");
    button.className = "breakdown-button";
    button.type = "button";
    button.textContent = "Breakdown";
    button.addEventListener("click", () => openBreakdown(card));
    card.querySelector("header").insertBefore(button, card.querySelector(".copy-button"));
  }
}

function openHashRoute() {
  const hash = location.hash;
  if (hash.startsWith("#ref-")) {
    const slug = hash.slice("#ref-".length);
    const term = REFERENCE_TERMS.find((candidate) => referenceSlug(candidate) === slug);
    if (term) openReference(term, { updateHash: false });
    return;
  }

  if (hash.startsWith("#breakdown-")) {
    const slug = hash.slice("#breakdown-".length);
    const card = cards.find((candidate) => cardSlug(candidate) === slug);
    if (card) openBreakdown(card, { updateHash: false });
  }
}

document.querySelector("#close-reference").addEventListener("click", () => referenceDialog.close());
referenceDialog.addEventListener("click", (event) => {
  if (event.target === referenceDialog) referenceDialog.close();
});
referenceDialog.addEventListener("close", () => {
  if (location.hash === activeReferenceHash || location.hash.startsWith("#ref-") || location.hash.startsWith("#breakdown-")) {
    history.replaceState(null, "", `${location.pathname}${location.search}`);
  }
  activeReferenceHash = "";
});

document.querySelector("#copy-reference-link").addEventListener("click", async (event) => {
  await navigator.clipboard.writeText(location.href);
  const button = event.currentTarget;
  button.textContent = "Link copied";
  setTimeout(() => { button.textContent = "Copy reference link"; }, 1200);
});

window.addEventListener("hashchange", openHashRoute);
window.addEventListener("scroll", hideTooltip, { passive: true });
window.addEventListener("resize", hideTooltip);

buildGlossaryIndex();
addBreakdownControls();
updateProgress();
updateLibrary();
openHashRoute();
