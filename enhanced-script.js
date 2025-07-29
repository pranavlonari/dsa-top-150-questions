// Enhanced script that integrates with the comprehensive problems database

// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Initialize the problems from database
function initializeProblems() {
  const problemsContainer = document.querySelector("#problems .container");

  // Clear existing problems except search container and load more
  const existingSections = problemsContainer.querySelectorAll(".topic-section");
  existingSections.forEach((section) => section.remove());

  // Load problems from database
  loadProblemsFromDatabase();
}

function loadProblemsFromDatabase() {
  const problemsContainer = document.querySelector("#problems .container");
  const loadMoreContainer = document.querySelector(".load-more-container");

  // Create sections for each category
  const categories = getAllCategories();

  categories.forEach((categoryKey) => {
    const problems = getProblemsByCategory(categoryKey);
    if (problems.length > 0) {
      const sectionElement = createDetailedTopicSection(categoryKey, problems);
      problemsContainer.insertBefore(sectionElement, loadMoreContainer);
    }
  });

  // Update search and filter functionality
  updateSearchAndFilter();
}

function createDetailedTopicSection(categoryKey, problems) {
  const section = document.createElement("div");
  section.className = "topic-section";
  section.id = `${categoryKey}-section`;

  const categoryTitle = formatCategoryTitle(categoryKey);
  const icon = getCategoryIcon(categoryKey);

  section.innerHTML = `
        <h3 class="topic-title">
            <span class="topic-icon">${icon}</span>
            ${categoryTitle}
        </h3>
        <div class="problems-list">
            ${problems
              .map((problem) => createDetailedProblemCard(problem))
              .join("")}
        </div>
    `;

  return section;
}

function createDetailedProblemCard(problem) {
  const approachesHtml = problem.approaches
    .map(
      (approach, index) => `
        <div class="approach-section">
            <h5 class="approach-title">
                <span class="approach-number">${index + 1}.</span>
                ${approach.name}
            </h5>
            <div class="approach-description">
                ${formatDescription(approach.description)}
            </div>
            <div class="complexity-info">
                <div class="complexity-item">
                    <strong>Time Complexity:</strong> <code>${
                      approach.timeComplexity
                    }</code>
                </div>
                <div class="complexity-item">
                    <strong>Space Complexity:</strong> <code>${
                      approach.spaceComplexity
                    }</code>
                </div>
            </div>
            <details class="solution-details">
                <summary>View ${approach.name} Solution</summary>
                <pre><code class="language-java">${approach.code}</code></pre>
            </details>
        </div>
    `
    )
    .join("");

  const optimizedHtml = problem.optimizedApproach
    ? `
        <div class="optimized-section">
            <h5 class="optimized-title">
                <span class="optimization-icon">⚡</span>
                Optimized: ${problem.optimizedApproach.name}
            </h5>
            <div class="optimized-description">
                ${formatDescription(problem.optimizedApproach.description)}
            </div>
            ${
              problem.optimizedApproach.advantages
                ? `
                <div class="advantages-list">
                    <strong>Advantages:</strong>
                    <ul>
                        ${problem.optimizedApproach.advantages
                          .map((adv) => `<li>${adv}</li>`)
                          .join("")}
                    </ul>
                </div>
            `
                : ""
            }
            <details class="solution-details optimized">
                <summary>View Optimized Solution</summary>
                <pre><code class="language-java">${
                  problem.optimizedApproach.code
                }</code></pre>
            </details>
        </div>
    `
    : "";

  const examplesHtml = problem.examples
    .map(
      (example, index) => `
        <div class="example-item">
            <div class="example-header">
                <strong>Example ${index + 1}:</strong>
            </div>
            <div class="example-content">
                <div class="example-input">
                    <strong>Input:</strong> <code>${example.input}</code>
                </div>
                <div class="example-output">
                    <strong>Output:</strong> <code>${example.output}</code>
                </div>
                ${
                  example.explanation
                    ? `
                    <div class="example-explanation">
                        <strong>Explanation:</strong> ${example.explanation}
                    </div>
                `
                    : ""
                }
            </div>
        </div>
    `
    )
    .join("");

  const constraintsHtml = problem.constraints
    ? `
        <div class="constraints-section">
            <h5>Constraints:</h5>
            <ul class="constraints-list">
                ${problem.constraints
                  .map((constraint) => `<li><code>${constraint}</code></li>`)
                  .join("")}
            </ul>
        </div>
    `
    : "";

  const keyInsightsHtml = problem.keyInsights
    ? `
        <div class="insights-section">
            <h5>🔑 Key Insights:</h5>
            <ul class="insights-list">
                ${problem.keyInsights
                  .map((insight) => `<li>${insight}</li>`)
                  .join("")}
            </ul>
        </div>
    `
    : "";

  const commonMistakesHtml = problem.commonMistakes
    ? `
        <div class="mistakes-section">
            <h5>⚠️ Common Mistakes:</h5>
            <ul class="mistakes-list">
                ${problem.commonMistakes
                  .map((mistake) => `<li>${mistake}</li>`)
                  .join("")}
            </ul>
        </div>
    `
    : "";

  const relatedProblemsHtml = problem.relatedProblems
    ? `
        <div class="related-section">
            <h5>🔗 Related Problems:</h5>
            <div class="related-problems">
                ${problem.relatedProblems
                  .map(
                    (related) => `<span class="related-tag">${related}</span>`
                  )
                  .join("")}
            </div>
        </div>
    `
    : "";

  return `
        <div class="problem-card detailed ${
          problem.difficulty
        }" data-category="${problem.category}" data-id="${problem.id}">
            <div class="problem-header">
                <div class="problem-title-section">
                    <h4 class="problem-title">${problem.id}. ${
    problem.title
  }</h4>
                    <span class="difficulty ${problem.difficulty}">${
    problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)
  }</span>
                </div>
                <div class="problem-actions">
                    <button class="bookmark-btn" title="Bookmark this problem">⭐</button>
                    <button class="expand-btn" title="Expand/Collapse">📖</button>
                </div>
            </div>
            
            <div class="problem-content">
                <div class="problem-description">
                    <h5>Problem Description:</h5>
                    <div class="description-text">
                        ${formatDescription(problem.description)}
                    </div>
                </div>
                
                <div class="examples-section">
                    <h5>Examples:</h5>
                    ${examplesHtml}
                </div>
                
                ${constraintsHtml}
                
                <div class="approaches-section">
                    <h5>Solution Approaches:</h5>
                    ${approachesHtml}
                </div>
                
                ${optimizedHtml}
                
                ${keyInsightsHtml}
                
                ${commonMistakesHtml}
                
                ${relatedProblemsHtml}
                
                <div class="problem-footer">
                    <div class="problem-stats">
                        <span class="stat-item">💡 ${
                          problem.approaches.length
                        } Approach${
    problem.approaches.length > 1 ? "es" : ""
  }</span>
                        ${
                          problem.optimizedApproach
                            ? '<span class="stat-item">⚡ Optimized Solution</span>'
                            : ""
                        }
                        <span class="stat-item">📚 Detailed Explanation</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function formatDescription(description) {
  // Convert markdown-like formatting to HTML
  return description
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/^(.*)$/, "<p>$1</p>");
}

function formatCategoryTitle(categoryKey) {
  const titleMap = {
    "arrays-and-strings": "Arrays & Strings",
    "two-pointers": "Two Pointers",
    "sliding-window": "Sliding Window",
    "binary-search": "Binary Search",
    heap: "Heap / Priority Queue",
    "dynamic-programming": "Dynamic Programming",
    backtracking: "Backtracking",
    graphs: "Graph Algorithms",
    trees: "Tree Algorithms",
    "linked-lists": "Linked Lists",
    "stack-queue": "Stack & Queue",
    "bit-manipulation": "Bit Manipulation",
    math: "Mathematical Problems",
    greedy: "Greedy Algorithms",
    trie: "Trie (Prefix Tree)",
  };

  return (
    titleMap[categoryKey] ||
    categoryKey
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function getCategoryIcon(category) {
  const icons = {
    "arrays-and-strings": "📋",
    "two-pointers": "👉",
    "sliding-window": "🪟",
    "binary-search": "🔍",
    heap: "🏔️",
    "dynamic-programming": "📈",
    backtracking: "🔄",
    graphs: "🕸️",
    trees: "🌳",
    "linked-lists": "🔗",
    "stack-queue": "📚",
    "bit-manipulation": "⚡",
    math: "📊",
    greedy: "🎯",
    trie: "🌲",
  };

  return icons[category] || "📝";
}

// Enhanced search functionality
function updateSearchAndFilter() {
  const searchInput = document.getElementById("searchInput");
  const problemCards = document.querySelectorAll(".problem-card");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();

      problemCards.forEach((card) => {
        const title = card
          .querySelector(".problem-title")
          .textContent.toLowerCase();
        const description = card
          .querySelector(".description-text")
          .textContent.toLowerCase();
        const approaches = Array.from(
          card.querySelectorAll(".approach-description")
        )
          .map((el) => el.textContent.toLowerCase())
          .join(" ");
        const insights = card.querySelector(".insights-list")
          ? card.querySelector(".insights-list").textContent.toLowerCase()
          : "";

        const isMatch =
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          approaches.includes(searchTerm) ||
          insights.includes(searchTerm);

        card.style.display = isMatch ? "block" : "none";
        if (isMatch) {
          card.style.animation = "fadeInUp 0.3s ease-out";
        }
      });

      updateSectionVisibility();
    });
  }

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      problemCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block";
        } else {
          const difficulty = card.querySelector(".difficulty");
          if (difficulty && difficulty.classList.contains(filter)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        }
      });

      updateSectionVisibility();
    });
  });
}

// Update section visibility based on visible problems
function updateSectionVisibility() {
  const sections = document.querySelectorAll(".topic-section");

  sections.forEach((section) => {
    const visibleProblems = section.querySelectorAll(
      '.problem-card[style*="display: block"], .problem-card:not([style*="display: none"])'
    );
    section.style.display = visibleProblems.length === 0 ? "none" : "block";
  });
}

// Bookmark functionality
function initializeBookmarks() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("bookmark-btn")) {
      const problemCard = e.target.closest(".problem-card");
      const problemId = problemCard.getAttribute("data-id");
      const isBookmarked = e.target.classList.contains("bookmarked");

      if (isBookmarked) {
        removeBookmark(problemId);
        e.target.classList.remove("bookmarked");
        e.target.textContent = "⭐";
        e.target.title = "Bookmark this problem";
      } else {
        addBookmark(problemId);
        e.target.classList.add("bookmarked");
        e.target.textContent = "🌟";
        e.target.title = "Remove bookmark";
      }
    }

    // Expand/Collapse functionality
    if (e.target.classList.contains("expand-btn")) {
      const problemCard = e.target.closest(".problem-card");
      const content = problemCard.querySelector(".problem-content");
      const isExpanded = content.style.display !== "none";

      if (isExpanded) {
        content.style.display = "none";
        e.target.textContent = "📖";
        e.target.title = "Expand";
      } else {
        content.style.display = "block";
        e.target.textContent = "📕";
        e.target.title = "Collapse";
      }
    }
  });

  loadBookmarks();
}

function addBookmark(problemId) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarkedProblems")) || [];
  if (!bookmarks.includes(problemId)) {
    bookmarks.push(problemId);
    localStorage.setItem("bookmarkedProblems", JSON.stringify(bookmarks));
  }
}

function removeBookmark(problemId) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarkedProblems")) || [];
  bookmarks = bookmarks.filter((id) => id !== problemId);
  localStorage.setItem("bookmarkedProblems", JSON.stringify(bookmarks));
}

function loadBookmarks() {
  const bookmarks =
    JSON.parse(localStorage.getItem("bookmarkedProblems")) || [];
  bookmarks.forEach((problemId) => {
    const problemCard = document.querySelector(`[data-id="${problemId}"]`);
    if (problemCard) {
      const bookmarkBtn = problemCard.querySelector(".bookmark-btn");
      bookmarkBtn.classList.add("bookmarked");
      bookmarkBtn.textContent = "🌟";
      bookmarkBtn.title = "Remove bookmark";
    }
  });
}

// Progress tracking
function initializeProgressTracking() {
  let readProblems = JSON.parse(localStorage.getItem("readProblems")) || [];

  // Mark problem as read when solution is viewed
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "SUMMARY") {
      const problemCard = e.target.closest(".problem-card");
      const problemId = problemCard.getAttribute("data-id");

      if (!readProblems.includes(problemId)) {
        readProblems.push(problemId);
        localStorage.setItem("readProblems", JSON.stringify(readProblems));

        // Add visual indicator
        problemCard.classList.add("read");
      }
    }
  });

  // Initialize read problems visual indicators
  readProblems.forEach((problemId) => {
    const problemCard = document.querySelector(`[data-id="${problemId}"]`);
    if (problemCard) {
      problemCard.classList.add("read");
    }
  });
}

// Topic card click handlers
function initializeTopicCards() {
  const topicCards = document.querySelectorAll(".topic-card");

  topicCards.forEach((card) => {
    card.addEventListener("click", () => {
      const topic = card.getAttribute("data-topic");
      const targetSection = document.getElementById(`${topic}-section`);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        document.getElementById("problems").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Statistics and analytics
function updateStatistics() {
  const totalProblems = document.querySelectorAll(".problem-card").length;
  const readProblems = JSON.parse(localStorage.getItem("readProblems")) || [];
  const bookmarkedProblems =
    JSON.parse(localStorage.getItem("bookmarkedProblems")) || [];

  const progressPercentage =
    totalProblems > 0
      ? Math.round((readProblems.length / totalProblems) * 100)
      : 0;

  // Update hero stats
  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length >= 3) {
    statNumbers[0].textContent = `${totalProblems}+`;
    statNumbers[1].textContent = getAllCategories().length + "+";
    statNumbers[2].textContent = "Java";
  }

  // Create progress indicator if not exists
  let progressIndicator = document.querySelector(".progress-indicator");
  if (!progressIndicator && totalProblems > 0) {
    progressIndicator = document.createElement("div");
    progressIndicator.className = "progress-indicator";
    progressIndicator.innerHTML = `
            <div class="progress-stats">
                <div class="progress-item">
                    <span class="progress-number">${readProblems.length}</span>
                    <span class="progress-label">Completed</span>
                </div>
                <div class="progress-item">
                    <span class="progress-number">${bookmarkedProblems.length}</span>
                    <span class="progress-label">Bookmarked</span>
                </div>
                <div class="progress-item">
                    <span class="progress-number">${progressPercentage}%</span>
                    <span class="progress-label">Progress</span>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercentage}%"></div>
            </div>
        `;

    const heroStats = document.querySelector(".hero-stats");
    if (heroStats) {
      heroStats.parentNode.insertBefore(
        progressIndicator,
        heroStats.nextSibling
      );
    }
  }
}

// Keyboard shortcuts
function initializeKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      const searchInput = document.getElementById("searchInput");
      if (searchInput) searchInput.focus();
    }

    // Escape to clear search
    if (e.key === "Escape") {
      const searchInput = document.getElementById("searchInput");
      if (document.activeElement === searchInput) {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input"));
        searchInput.blur();
      }
    }

    // Ctrl/Cmd + B to toggle bookmarks filter
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      toggleBookmarksFilter();
    }
  });
}

function toggleBookmarksFilter() {
  const bookmarkedProblems =
    JSON.parse(localStorage.getItem("bookmarkedProblems")) || [];
  const problemCards = document.querySelectorAll(".problem-card");

  const isShowingBookmarks =
    document.body.classList.contains("showing-bookmarks");

  if (isShowingBookmarks) {
    // Show all problems
    problemCards.forEach((card) => (card.style.display = "block"));
    document.body.classList.remove("showing-bookmarks");
  } else {
    // Show only bookmarked problems
    problemCards.forEach((card) => {
      const problemId = card.getAttribute("data-id");
      card.style.display = bookmarkedProblems.includes(problemId)
        ? "block"
        : "none";
    });
    document.body.classList.add("showing-bookmarks");
  }

  updateSectionVisibility();
}

// Dark mode toggle
function initializeDarkMode() {
  const darkModeToggle = document.createElement("button");
  darkModeToggle.innerHTML = "🌙";
  darkModeToggle.className = "dark-mode-toggle";
  darkModeToggle.title = "Toggle dark mode";
  darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: var(--transition);
    `;

  document.body.appendChild(darkModeToggle);

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.innerHTML = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";

    // Save preference
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode")
    );
  });

  // Load dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    darkModeToggle.innerHTML = "☀️";
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 LeetCode Top 150 Guide loaded successfully!");

  // Wait for problems database to be available
  if (typeof problemsDatabase !== "undefined") {
    initializeProblems();
    initializeBookmarks();
    initializeProgressTracking();
    initializeTopicCards();
    initializeKeyboardShortcuts();
    initializeDarkMode();

    // Update statistics after a short delay to ensure everything is rendered
    setTimeout(updateStatistics, 100);

    console.log("💡 Tip: Use Ctrl/Cmd + K to quickly search problems");
    console.log("🔖 Tip: Use Ctrl/Cmd + B to filter bookmarked problems");
    console.log("🌙 Dark mode toggle available in bottom right corner");
  } else {
    console.warn(
      "Problems database not found. Please ensure problems-database.js is loaded."
    );
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease-out";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards for animation (will be called after problems are loaded)
function observeCardsForAnimation() {
  document
    .querySelectorAll(".feature-card, .topic-card, .problem-card")
    .forEach((card) => {
      observer.observe(card);
    });
}

// Call after problems are loaded
setTimeout(observeCardsForAnimation, 200);
