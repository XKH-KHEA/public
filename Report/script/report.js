document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("add-product-form");
    const productList = document.getElementById("product-list");
    const printButton = document.getElementById("print-button");
    const pdfButton = document.getElementById("pdf-button");
  
    // Fetch and display products
    fetch("https://khmer-shoping.onrender.com/products/view")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((product) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${product.name} - $${product.price}`;
          productList.appendChild(listItem);
        });
      })
      .catch((error) => console.error("Error fetching products:", error));
  
    // Handle form submission
    productForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const formData = new FormData(productForm);
      const productData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: parseFloat(formData.get("price")),
        categoryId: formData.get("category"),
        imageUrl: formData.get("imageUrl"),
        stock: parseInt(formData.get("stock")),
      };
  
      fetch("https://khmer-shoping.onrender.com/products/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
        .then((response) => response.json())
        .then((newProduct) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${newProduct.name} - $${newProduct.price}`;
          productList.appendChild(listItem);
          productForm.reset();
        })
        .catch((error) => console.error("Error:", error));
    });
  
    // Print the product list
    printButton.addEventListener("click", () => {
      window.print();
    });
  
    // Generate PDF report of the product list
    pdfButton.addEventListener("click", () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const listItems = productList.getElementsByTagName("li");
  
      doc.text("Product List", 10, 10);
      let y = 20;
  
      for (let i = 0; i < listItems.length; i++) {
        doc.text(listItems[i].textContent, 10, y);
        y += 10;
      }
  
      doc.save("product-list.pdf");
    });
  });
  