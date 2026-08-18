const STORAGE_KEY = "task-grind.tasks.v1";

const elements = {
  form: document.querySelector("#task-form"),
  title: document.querySelector("#task-title"),
  titleError: document.querySelector("#title-error"),
  search: document.querySelector("#task-search"),
  filters: document.querySelector("#task-filters"),
  list: document.querySelector("#task-list"),
  summary: document.querySelector("#task-summary"),
  empty: document.querySelector("#empty-state"),
};

let state = {
  tasks: loadTasks(),
  filter: "all",
  search: "",
};

function loadTasks() {
  // TODO: Read STORAGE_KEY, parse safely, validate that the result is an array.
  return [];
}

function saveTasks() {
  // TODO: Serialize state.tasks to localStorage.
}

function visibleTasks() {
  // TODO: Derive tasks matching both state.filter and state.search.
  return state.tasks;
}

function createTaskElement(task) {
  // TODO: Build an li using createElement/textContent. Include controls with
  // data-action="toggle" and data-action="delete", plus data-id on the li.
  const item = document.createElement("li");
  item.textContent = task.title;
  return item;
}

function render() {
  // TODO: Replace list children, calculate summary, and toggle empty state.
  const fragment = document.createDocumentFragment();
  for (const task of visibleTasks()) fragment.append(createTaskElement(task));
  elements.list.replaceChildren(fragment);
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  // TODO: Validate form, create a task, update state, persist, reset, render.
});

elements.list.addEventListener("click", (event) => {
  // TODO: Use closest() for event delegation; toggle or delete by task id.
});

elements.filters.addEventListener("click", (event) => {
  // TODO: Update filter and every filter button's aria-pressed value.
});

elements.search.addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

render();

