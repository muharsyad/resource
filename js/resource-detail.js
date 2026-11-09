let isNewestFirst = true;

function toggleMenu() {
    document.getElementById("mobile-menu").classList.toggle("active");
}

function getTargetElements() {
    const cards = document.querySelectorAll(".resource-card");
    if (cards.length > 0) return cards;
    return document.querySelectorAll(".resource-item");
}

function filterResources(category) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach((btn) => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`btn-${category}`);
    if (activeBtn) activeBtn.classList.add("active");

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";

    const items = getTargetElements();
    let visibleCount = 0;

    items.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        if (category === "all" || itemCategory === category) {
            item.classList.remove("hidden");
            visibleCount++;
        } else {
            item.classList.add("hidden");
        }
    });

    updateCounter(visibleCount);
    toggleEmptyState(visibleCount > 0);
}

function searchResources() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    const items = getTargetElements();
    let visibleCount = 0;

    const allBtn = document.getElementById("btn-all");
    if (input.length > 0 && allBtn) {
        document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
        allBtn.classList.add("active");
    }

    items.forEach((item) => {
        const textContent = item.innerText.toLowerCase();
        if (textContent.includes(input)) {
            item.classList.remove("hidden");
            visibleCount++;
        } else {
            item.classList.add("hidden");
        }
    });

    updateCounter(visibleCount);
    toggleEmptyState(visibleCount > 0);
}

function reverseResourceList() {
    const grid = document.getElementById("resourcesGrid");
    const items = Array.from(grid.querySelectorAll(".resource-item"));
    if (items.length === 0) return;

    items.reverse().forEach((item) => grid.appendChild(item));

    isNewestFirst = !isNewestFirst;
    const sortText = document.getElementById("sortText");
    const sortIcon = document.getElementById("sortIcon");

    if (sortText && sortIcon) {
        sortText.textContent = isNewestFirst ? "Terbaru" : "Terlama";
        sortIcon.className = isNewestFirst ? "fas fa-sort-amount-down" : "fas fa-sort-amount-up";
    }
}

function updateCounter(count) {
    const counter = document.getElementById("docCounter");
    if (counter) {
        counter.textContent = `Menampilkan ${count} dokumen`;
    }
}

function toggleEmptyState(visible) {
    const noResults = document.getElementById("noResults");
    if (!noResults) return;
    if (visible) {
        noResults.classList.add("hidden");
    } else {
        noResults.classList.remove("hidden");
    }
}