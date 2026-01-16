let products = [];
let currentPage = 1;
const itemsPerPage = 12;
const cart = [];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const priceFilter = document.getElementById("priceFilter");



function renderProducts(arr) {
  const listEl = document.getElementById('productGrid');
  listEl.innerHTML = '';  

  arr.forEach((p, index) => {
    const div = document.createElement('div');
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="/image/${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.description || ""}</p>
      <p class="price">Giá: ${p.price.toLocaleString("vi-VN")}đ</p>
      <button onclick="showModal(${index})">🔍 Xem chi tiết</button>
      <button onclick="addToCart(${index})">➕ Thêm vào giỏ</button>
    `;
    listEl.appendChild(div);
  });
}

// Lấy dữ liệu sản phẩm từ API
fetch("https://web-af-o7cx.onrender.com/api/products")
  .then((res) => res.json())
  .then((data) => {
    console.log("API data:", data); //Xem dữ liệu thật ở đây
    if (Array.isArray(data)) {
      products = data.map(p => ({
        name: p.name,
        price: parseInt(p.price),
        description: p.description,
        image: p.image || p.image_url// backend trả về đúng field này
      }));
      displayProducts(products);
    }
  })
  .catch((err) => console.error("Lỗi fetch:", err));

// Hiển thị sản phẩm ra grid
function displayProducts(items) {
  grid.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(start, start + itemsPerPage);

  paginatedItems.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="/image/${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p class="price">${p.price.toLocaleString()}đ</p>
      <button onclick="addToCart(${index})">➕ Thêm vào giỏ</button>
    `;
    grid.appendChild(div);
  });

  renderPagination(items);
}

// Lọc giá
priceFilter.addEventListener("change", () => {
  const val = priceFilter.value;
  let filtered = [...products];

  if (val === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (val === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (val === "low") {
    filtered = products.filter(p => p.price < 1000000);
  } else if (val === "mid") {
    filtered = products.filter(p => p.price >= 1000000 && p.price <= 2000000);
  } else if (val === "high") {
    filtered = products.filter(p => p.price > 2000000);
  }

  currentPage = 1;
  displayProducts(filtered);
});

// Tìm kiếm
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword) ||
    p.description.toLowerCase().includes(keyword)
  );
  displayProducts(filtered);
});

// Phân trang
function renderPagination(items) {
  let pagination = document.getElementById("pagination");
  if (!pagination) {
    pagination = document.createElement("div");
    pagination.id = "pagination";
    pagination.style.textAlign = "center";
    pagination.style.marginTop = "20px";
    document.getElementById("products").appendChild(pagination);
  }

  pagination.innerHTML = "";
  const totalPages = Math.ceil(items.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.style.margin = "0 4px";
    btn.onclick = () => {
      currentPage = i;
      displayProducts(items);
    };
    pagination.appendChild(btn);
  }
}

// Giỏ hàng cơ bản (chưa hiển thị UI giỏ hàng)
function addToCart(index) {
  const item = products[index];
  alert(`Đã thêm "${item.name}" vào giỏ hàng!`);
}
