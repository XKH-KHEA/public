document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const productContainer = document.getElementById("products");

  let debounceTimeout;

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      const query = searchInput.value.trim();
      if (query) {
        const products = await fetchProducts(query);
        displayProducts(products);
      } else {
        productContainer.innerHTML = ""; // Clear the products when input is empty
        loadNoProductScript(); // Call external script if no products
      }
    }, 300); // Adjust the debounce delay as needed
  });

  async function fetchProducts(query) {
    const response = await fetch(`https://khmer-shoping.onrender.com/products?q=${query}`);
    const products = await response.json();
    return products;
  }

  function displayProducts(products) {
    productContainer.innerHTML = "";
    if (products.length === 0) {
      productContainer.innerHTML = "<p>No products found.</p>";
      //loadNoProductScript(); // Call external script if no products found
      return;
    }

    products.forEach((product) => {
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
  }

  function loadNoProductScript() {
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
  }
});
