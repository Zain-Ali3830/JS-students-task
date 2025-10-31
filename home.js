const cartArray = JSON.parse(localStorage.getItem("cart")) || [];
const wishlistArray = JSON.parse(localStorage.getItem("wishlist")) || [];
// Function to fetch data
function fetchData() {
  fetch("https://fakestoreapi.com/products")
    // .then((data)=>console.log("Data",data))
    .then((response) => response.json())
    .then((products) => {
      console.log("Products:", products);
      renderProducts(products);
      searchItems(products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

fetchData();



// Function to render products
function renderProducts(products) {
  const mainContainer = document.getElementById("mainContainer");
  mainContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("productCard");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.title.slice(0, 15)}</h3>
      <p>${product.price}</p>
      <button class="addToCart">Add to Cart</button>
      <button class="addToWishlist">Add to Wishlist</button>
    `;


    // Addto cart and wishlist
    productCard.querySelector(".addToCart").addEventListener("click", () =>{
        const exists = cartArray.find((item) => item.id === product.id);

        if (!exists) {
            cartArray.push(product);
            localStorage.setItem("cart", JSON.stringify(cartArray));
            console.log("Added to Cart:", product);
            alert("Added to Cart");
        } else {
            console.log("Already in Cart:", product);
            alert("Already in Cart");
        }
    });

    //Add to wishlist
    productCard.querySelector(".addToWishlist").addEventListener("click", () => {
        const exists = wishlistArray.find((item) => item.id === product.id);

        if (!exists) {
            wishlistArray.push(product);
            localStorage.setItem("wishlist", JSON.stringify(wishlistArray));
            console.log("Added to Wishlist:", product);
            alert("Added to Wishlist");
        } else {
            console.log("Already in Wishlist:", product);
            alert("Already in Wishlist");
        }
    });

    mainContainer.append(productCard);
  });
}



// Function to Search Items from Search Bar
function searchItems(products) {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keyup",()=>{ 
    
    const searchTerm=searchInput.value.toLowerCase();
    console.log(searchTerm);
    const filteredProducts=products.filter((product)=>{
        return product.title.toLowerCase().includes(searchTerm);
    });
    renderProducts(filteredProducts);
  })



}


searchItems();