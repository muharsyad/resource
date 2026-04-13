function toggleMenu() {
    document.getElementById("mobile-menu").classList.toggle("active");
}

function filterResources(category) {
    // Update active buttons
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach((btn) => btn.classList.remove("active"));
    document.getElementById(`btn-${category}`).classList.add("active");

    // Logic hide/show items
    const resources = document.querySelectorAll(".resource-item");
    let hasVisible = false;

    resources.forEach((res) => {
        const resCategory = res.getAttribute("data-category");
        if (category === "all" || resCategory === category) {
            res.classList.remove("hidden");
            hasVisible = true;
        } else {
            res.classList.add("hidden");
        }
    });

    toggleEmptyState(hasVisible);
}

function searchResources() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const resources = document.querySelectorAll(".resource-item");
    let hasVisible = false;

    if (input.length > 0) {
        document
            .querySelectorAll(".filter-btn")
            .forEach((btn) => btn.classList.remove("active"));
        document.getElementById("btn-all").classList.add("active");
    }

    resources.forEach((res) => {
        // Ambil semua teks (Judul, Tag, Size)
        const textContent = res.innerText.toLowerCase();

        if (textContent.includes(input)) {
            res.classList.remove("hidden");
            hasVisible = true;
        } else {
            res.classList.add("hidden");
        }
    });

    toggleEmptyState(hasVisible);
}

function toggleEmptyState(visible) {
    const noResults = document.getElementById("noResults");
    if (visible) {
        noResults.classList.add("hidden");
    } else {
        noResults.classList.remove("hidden");
    }
}
