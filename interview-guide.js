const STORAGE_KEY = "mern-grind-interview-prep";
const tasks = [...document.querySelectorAll("[data-guide-task]")];
const readinessBar = document.querySelector("#readiness-bar");
const readinessPercent = document.querySelector("#readiness-percent");
const readinessLabel = document.querySelector("#readiness-label");
const resetButton = document.querySelector("#reset-progress");

function readSavedTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function updateReadiness() {
  const completed = tasks.filter((task) => task.checked).length;
  const percent = Math.round((completed / tasks.length) * 100);
  const completedIds = tasks.filter((task) => task.checked).map((task) => task.dataset.guideTask);

  readinessBar.style.width = `${percent}%`;
  readinessPercent.textContent = `${percent}%`;
  readinessLabel.textContent = `${completed} of ${tasks.length} preparation steps complete`;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
  } catch {
    // The checklist still works when browser storage is unavailable.
  }
}

const savedTasks = readSavedTasks();
tasks.forEach((task) => {
  task.checked = savedTasks.includes(task.dataset.guideTask);
  task.addEventListener("change", updateReadiness);
});

resetButton.addEventListener("click", () => {
  tasks.forEach((task) => {
    task.checked = false;
  });
  updateReadiness();
});

const sectionLinks = [...document.querySelectorAll(".section-nav a")];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

    if (!visibleSection) return;

    sectionLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visibleSection.target.id}`);
    });
  },
  { rootMargin: "-18% 0px -68%", threshold: [0, 0.15, 0.35] },
);

sections.forEach((section) => sectionObserver.observe(section));
updateReadiness();
