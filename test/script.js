document.addEventListener('DOMContentLoaded', function () {
    const productApiUrl = 'https://khmer-shoping.onrender.com/products/view';
    const categoryApiUrl = 'https://khmer-shoping.onrender.com/categories';

    // Fetch and display total sum for products
    fetch(productApiUrl)
        .then(response => response.json())
        .then(data => {
            let totalSum = 0;
            data.forEach(product => {
                totalSum += product.price; // Assuming each product has a 'total' property
            });
            document.getElementById('totalSum').innerText = `Total Sum: $${totalSum}`;
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            document.getElementById('totalSum').innerText = 'Error loading data';
        });

    // Fetch and display category count
    fetch(categoryApiUrl)
        .then(response => response.json())
        .then(data => {
            let categoryCount = data.length;
            document.getElementById('categoryList').innerText = `Total Categories: ${categoryCount}`;
        })
        .catch(error => {
            console.error('Error fetching category data:', error);
            document.getElementById('categoryList').innerText = 'Error loading data';
        });
});
