const loadProducts = () => {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => displayProducts(data))
}

const displayProducts = (products) => {
    const productsContainer = document.getElementById('products-container')
    productsContainer.innerHTML = ""
    products.forEach(product => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top p-4" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <h6>$${product.price}</h6>
            <p class="card-text">${product.description.slice(0,100)}...</p>
            <a href="details.html?productID=${product.id}" class="btn btn-dark">See Details</a>
           
          </div>
        </div>
        `
        productsContainer.appendChild(div)
    })
}

const loadCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => displayCategories(data))
}

const displayCategories = (categories) => {
    categories.forEach(category => {
        const categoriesContainer = document.getElementById('categoriesContainer')
        const li = document.createElement('li')
        li.innerHTML = `
        <button class="dropdown-item"  onclick=loadCategoryWise('${category}') href="#">${category}</button>
        `
        categoriesContainer.appendChild(li)
    })
}

const loadCategoryWise = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => displayProducts(data))
}




const getParams = () => {
    const param = new URLSearchParams(window.location.search).get("productID")
    fetch(`https://fakestoreapi.com/products/${param}`)
    .then(res => res.json())
    .then(data => displayDetails(data))
}

const displayDetails = (product) => {
    console.log(product);
    const productDetails = document.getElementById("productDetails")
    const div = document.createElement("div")
    div.innerHTML = `
        <div class="d-flex">
            <div>
                <img style="width:600px; height:500px; object-fit: contain;" src="${product.image}" alt="">
            </div>
            <div class="p-5">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <h4>Price: $${product.price}</h4>
                <h5>Category: ${product.category}</h5>
                <p>Rating: ${product.rating.rate}</p>
            </div>
        </div>
    `
    productDetails.appendChild(div)
}

getParams()

loadProducts()
loadCategories()