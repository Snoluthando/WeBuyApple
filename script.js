/* =========================
      iPHONES PAGE SCRIPT
   ========================= */

console.log("iPhones script loaded");

// =========================
// DATASET (30 iPhones)
// =========================
const iphones = [
  { id: 1, model: "iPhone 15 Pro", storage: "256GB", condition: "Excellent", price: 21499, img: "https://via.placeholder.com/150" },
  { id: 2, model: "iPhone 15 Pro Max", storage: "512GB", condition: "Like New", price: 25999, img: "https://via.placeholder.com/150" },
  { id: 3, model: "iPhone 15", storage: "128GB", condition: "Good", price: 13999, img: "https://via.placeholder.com/150" },
  { id: 4, model: "iPhone 14 Pro", storage: "256GB", condition: "Excellent", price: 16999, img: "https://via.placeholder.com/150" },
  { id: 5, model: "iPhone 14", storage: "128GB", condition: "Good", price: 11999, img: "https://via.placeholder.com/150" },
  { id: 6, model: "iPhone 13 Pro", storage: "128GB", condition: "Excellent", price: 11999, img: "https://via.placeholder.com/150" },
  { id: 7, model: "iPhone 13", storage: "256GB", condition: "Good", price: 8999, img: "https://via.placeholder.com/150" },
  { id: 8, model: "iPhone 13 Mini", storage: "128GB", condition: "Excellent", price: 7499, img: "https://via.placeholder.com/150" },
  { id: 9, model: "iPhone 12 Pro", storage: "256GB", condition: "Excellent", price: 8499, img: "https://via.placeholder.com/150" },
  { id: 10, model: "iPhone 12", storage: "128GB", condition: "Good", price: 6499, img: "https://via.placeholder.com/150" }
  // add remaining items as needed...
];

// =========================
// DOM ELEMENTS
// =========================
const grid = document.getElementById("productGrid"); // matches HTML
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.querySelector(".filter-panel");
const closeFilter = document.getElementById("closeFilter");

// Filter checkboxes
const modelFilters = document.querySelectorAll(".filter-model");
const storageFilters = document.querySelectorAll(".filter-storage");
const conditionFilters = document.querySelectorAll(".filter-condition");

// Pagination
const paginationContainer = document.querySelector(".pagination");
let currentPage = 1;
const itemsPerPage = 9;

// =========================
// RENDER PRODUCTS
// =========================
function renderProducts() {
  const filtered = applyFilters();
  const sorted = applySorting(filtered);
  const paginated = paginate(sorted);

  grid.innerHTML = paginated
    .map(phone => `
      <div class="product-card">
        <img src="${phone.img}" alt="${phone.model}">
        <h3>${phone.model}</h3>
        <p>${phone.storage} • ${phone.condition}</p>
        <p class="price">R${phone.price.toLocaleString()}</p>
        <div class="actions">
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <a href="#" class="view-more">View</a>
        </div>
      </div>
    `).join("");

  renderPagination(sorted.length);
}

// =========================
// FILTER LOGIC
// =========================
function applyFilters() {
  const selectedModels = [...modelFilters].filter(f => f.checked).map(f => f.value);
  const selectedStorage = [...storageFilters].filter(f => f.checked).map(f => f.value);
  const selectedCondition = [...conditionFilters].filter(f => f.checked).map(f => f.value);
  const searchValue = searchInput.value.toLowerCase();

  return iphones.filter(phone => {
    const matchesModel = selectedModels.length ? selectedModels.includes(phone.model) : true;
    const matchesStorage = selectedStorage.length ? selectedStorage.includes(phone.storage) : true;
    const matchesCondition = selectedCondition.length ? selectedCondition.includes(phone.condition) : true;
    const matchesSearch = phone.model.toLowerCase().includes(searchValue);

    return matchesModel && matchesStorage && matchesCondition && matchesSearch;
  });
}

// =========================
// SORTING
// =========================
function applySorting(list) {
  const sort = sortSelect.value;

  if (sort === "low-high") return [...list].sort((a, b) => a.price - b.price);
  if (sort === "high-low") return [...list].sort((a, b) => b.price - a.price);
  if (sort === "newest") return list.reverse();

  return list;
}

// =========================
// PAGINATION
// =========================
function paginate(list) {
  const start = (currentPage - 1) * itemsPerPage;
  return list.slice(start, start + itemsPerPage);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      renderProducts();
    });

    paginationContainer.appendChild(btn);
  }
}

// =========================
// FILTER PANEL OPEN/CLOSE
// =========================
filterBtn.addEventListener("click", () => {
  filterPanel.classList.add("open");
});

closeFilter.addEventListener("click", () => {
  filterPanel.classList.remove("open");
});

// =========================
// LIVE LISTENERS
// =========================
searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderProducts();
});

sortSelect.addEventListener("change", () => {
  currentPage = 1;
  renderProducts();
});

[...modelFilters, ...storageFilters, ...conditionFilters].forEach(f =>
  f.addEventListener("change", () => {
    currentPage = 1;
    renderProducts();
  })
);

// =========================
// INITIAL RENDER
// =========================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
