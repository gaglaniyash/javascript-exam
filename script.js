document.querySelector(".add-product").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const price = parseFloat(document.getElementById("price").value);
    const image = document.getElementById("image").value;
    const category = document.getElementById("category").value;

    if (title && price && !isNaN(price)) {
        const productdetail = { id: Date.now(), title, price, image, category }

        let products = JSON.parse(localStorage.getItem('products')) || []
        products.push(productdetail);
        localStorage.setItem('products', JSON.stringify(products));

        displayProducts();
        clearProductData()
    }

    else {
        alert("please fill all the fields");
    }
});

function clearProductData() {
    document.getElementById("title").value = '';
    document.getElementById("price").value = '';
    document.getElementById("image").value = '';
    document.getElementById("category").value = 'electronics';
}

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = '';

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach((product) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}" width="150" height="150">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
            <button onclick="editProduct()" class="btn btn-primary">Edit</button>
            <button onclick="deleteProduct(${product.id})" class="btn btn-danger">Delete</button>
        `;
        productList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', displayProducts);

function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

function sortProducts(order) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts()
}

document.getElementById("category").addEventListener('change', function(e) {
    const category = e.target.value;
    let products = JSON.parse(localStorage.getItem('products')) || [];
    if(category) {
        products = products.filter(product => product.category === category);
    }
    displayProducts(products);
})