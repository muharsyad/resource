function toggleMenu() {
    document.getElementById("mobile-menu").classList.toggle("active");
}

function getTargetElements() {
    // Otomatis mendeteksi apakah halaman berisi Card (Halaman Utama) atau List Item (Halaman Detail)
    const cards = document.querySelectorAll(".resource-card");
    if (cards.length > 0) return cards;
    return document.querySelectorAll(".resource-item");
}

function filterResources(category) {
    // Update tombol aktif
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach((btn) => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`btn-${category}`);
    if (activeBtn) activeBtn.classList.add("active");

    // Reset input pencarian saat ganti tab kategori
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";

    const items = getTargetElements();
    let hasVisible = false;

    items.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        if (category === "all" || itemCategory === category) {
            item.classList.remove("hidden");
            hasVisible = true;
        } else {
            item.classList.add("hidden");
        }
    });

    toggleEmptyState(hasVisible);
}

function searchResources() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    const items = getTargetElements();
    let hasVisible = false;

    // Jika sedang mengetik dan ada tombol filter, aktifkan tab "Semua"
    const allBtn = document.getElementById("btn-all");
    if (input.length > 0 && allBtn) {
        document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
        allBtn.classList.add("active");
    }

    items.forEach((item) => {
        const textContent = item.innerText.toLowerCase();
        if (textContent.includes(input)) {
            item.classList.remove("hidden");
            hasVisible = true;
        } else {
            item.classList.add("hidden");
        }
    });

    toggleEmptyState(hasVisible);
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