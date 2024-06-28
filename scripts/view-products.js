document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("products");

  // Fetch and display products
  fetch("https://khmer-shoping.onrender.com/products/view")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        const rating = 4;
        const stars = getStarRating(rating);
        productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <div class="product-details">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <div class="star-rating">${stars}</div>
                    </div>
                `;
        productCard.addEventListener("click", () => {
          window.location.href = `./page/buy-product.html?id=${product._id}`;
        });
        productContainer.appendChild(productCard);
      });
    })
    .catch((error) => console.error("Error:", error));
});

function getStarRating(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}
document.getElementById("account-link").onclick = function () {
  var sidebar = document.getElementById("sidebar");
  if (sidebar.style.width === "300px") {
    sidebar.style.width = "0";
  } else {
    sidebar.style.width = "300px";
  }
};
document.getElementById("product-sidbar").onclick = function () {
  var sidebar = document.getElementById("sidebars");
  if (sidebar.style.width === "250px") {
    sidebar.style.width = "0";
  } else {
    sidebar.style.width = "250px";
  }
};
document.getElementById("sidebar-contacts").onclick = function () {
  var sidebar = document.getElementById("sidebar-contact");
  if (sidebar.style.width === "400px") {
    sidebar.style.width = "0";
  } else {
    sidebar.style.width = "400px";
  }
};
document.getElementById("close-sidebar").onclick = function () {
  document.getElementById("sidebars").style.width = "0";
};

// JavaScript code to handle category filtering
document.querySelectorAll(".dropdown-content a").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const category = this.getAttribute("data-category");
    // Call a function to filter products based on category
    filterProductsByCategory(category);
  });
});

function filterProductsByCategory(category) {
  // Implement logic to filter products by category
  // You can show/hide products based on the selected category
}

function toggleButton() {
  const toggleButton = document.getElementById("mode-toggle");
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}

// const viewToggleButton = document.getElementById("toggle-view");
// const productContainer = document.getElementById("products");

// viewToggleButton.addEventListener("click", () => {
//   if (productContainer.classList.contains("card-view")) {
//     productContainer.classList.remove("card-view");
//     productContainer.classList.add("list-view");
//     viewToggleButton.innerHTML = '<i class="fas fa-th-large"></i> Card View';
//   } else {
//     productContainer.classList.remove("list-view");
//     productContainer.classList.add("card-view");
//     viewToggleButton.innerHTML = '<i class="fas fa-list"></i> List View';
//   }
// });
// fetch("https://khmer-shoping.onrender.com/products/view")
//   .then((response) => response.json())
//   .then((data) => {
//     const scrollContainer = document.getElementById("productss");
//     data.products.forEach((product) => {
//       const productDiv = document.createElement("div");
//       productDiv.class("product");
//       productDiv.innerHTML = `
//             <img src="${product.image}" alt="${product.name}">
//             <div class="product-details">
//               <h3>${product.name}</h3>
//               <p>${product.description}</p>
//               <p>Price: $${product.price}</p>
//             </div>
//           `;
//       scrollContainer.appendChild(productDiv);
//     });
//   })
//   .catch((error) => console.error("Error fetching products:", error));
// // const productContainer = document.getElementById("productss");

// // Fetch and display products
// fetch("https://khmer-shoping.onrender.com/products/view")
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((product) => {
//       const productCard = document.createElement("div");
//       productCard.className = "product-card";
//       const rating = 4;
//       const stars = getStarRating(rating);
//       productCard.innerHTML = `
//           <img src="${product.imageUrl}" alt="${product.name}">
//           <div class="product-details">
//               <h2>${product.name}</h2>
//               <p>${product.description}</p>
//               <p><strong>Price:</strong> $${product.price}</p>
//               <div class="star-rating">${stars}</div>
//           </div>
//       `;
//       productCard.addEventListener("click", () => {
//         window.location.href = `./page/buy-product.html?id=${product._id}`;
//       });
//       productContainer.appendChild(productCard);
//     });
//   })
// .catch((error) => console.error("Error:", error));
