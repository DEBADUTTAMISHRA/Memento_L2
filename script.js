document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
    const cardsContainer = document.querySelector('.cards');
    const categoryList = document.querySelectorAll('.category li');

    // Function to fetch data and render product cards
    const fetchDataAndDisplay = (categoryName) => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const categories = data.categories;
                let categoryProducts = [];

                // Find matching category and get products
                categories.forEach(category => {
                    if (category.category_name.toLowerCase() === categoryName.toLowerCase()) {
                        categoryProducts = category.category_products;
                    }
                });

                // Clear previous cards
                cardsContainer.innerHTML = '';

                // Create and append new cards
                categoryProducts.forEach(product => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    card.innerHTML = `
                        <div class="item-img">
                            <img src="${product.image}" alt="${product.title}">
                            <div class="badge">${product.badge_text ? product.badge_text : ''}</div>
                        </div>
                        <div class="product-title">
                            <span class="title">${product.title}</span>
                            <ul class="vendor">
                                <li>${product.vendor}</li>
                            </ul>
                        </div>
                        <div class="product-price">
                            <ul>
                                <li class="price">Rs  ${product.price}</li>
                                <li class="compare_at_price">${product.compare_at_price}.00</li>
                                <li class="off">${calculateDiscount(product.price, product.compare_at_price)} off</li>
                            </ul>
                        </div>
                         <button class="cart-btn">Add to cart</button>
                    `;

                    cardsContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    // Event listener for each category item
    categoryList.forEach(category => {
        category.addEventListener('click', () => {
            const selectedCategory = category.dataset.category; // Get the category name from data attribute
            fetchDataAndDisplay(selectedCategory);
        });
    });

    // Function to calculate discount percentage
    const calculateDiscount = (price, compareAtPrice) => {
        if (!price || !compareAtPrice) return '';
        const priceNum = parseFloat(price);
        const compareAtPriceNum = parseFloat(compareAtPrice);
        if (compareAtPriceNum <= priceNum) return '';
        const discount = Math.round(((compareAtPriceNum - priceNum) / compareAtPriceNum) * 100);
        return `Save ${discount}%`;
    };
});
