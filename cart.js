// function renderCart
const cartData=JSON.parse(localStorage.getItem("cart"))||[];
console.log(cartData)
// Adding quantity to cart
cartData.forEach(p => {
  if (!p.quantity) p.quantity = 1;
});
let subTotal=0;
function renderCart(data,subTotal){
    const cartContainer = document.getElementById("cartContainer");
    cartContainer.innerHTML = "";
    if(data.length===0){
        cartContainer.innerHTML="<p>Your cart is empty</p>";
        return;
    }

    data.forEach((product)=>{
        const cartCard=document.createElement("div");
        cartCard.classList.add("cartCard");
        subTotal=product.price*product.quantity;
        cartCard.innerHTML=`
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <button class="increment">+</button>
        <p>${product.quantity}</p>
        <button class="decrement">-</button>
        <p>${subTotal.toFixed(2)}</p>
        <button class="removeFromCart">Remove from Cart</button>
        
        `;
        console.log(subTotal);
        const removeFromCartBtn=cartCard.querySelector(".removeFromCart");
        removeFromCartBtn.addEventListener("click", () => {
            removeFromCart(product);
        });
        const incrementBtn=cartCard.querySelector(".increment");
        incrementBtn.addEventListener("click",()=>increment(product.id))
        const decrementBtn=cartCard.querySelector(".decrement");
        decrementBtn.addEventListener("click", () =>decrement(product.id))
        cartContainer.append(cartCard);
    })
}


renderCart(cartData,subTotal)






// function remove from cart

function removeFromCart(product){
    console.log(cartData)
    const exists= cartData.find((item) => item.id === product.id);
    if(exists){
        cartData.splice(cartData.indexOf(exists), 1);
        console.log("Removed from Cart:", product);
        localStorage.setItem("cart", JSON.stringify(cartData));
        console.log("Removed from Cart:", product);
        alert("Removed from Cart");
        renderCart(cartData,subTotal);
    }
    console.log("Cart Array:", cartData);
}


// Search Items from cart

function searchItems(cartData) {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredcartData = cartData.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm);
      });
      renderCart(filteredcartData,subTotal);
    });
  }

  searchItems(cartData);



// Increment 
  function increment(productId){
     const product = cartData.find(item => item.id === productId);
  if (product) {
    product.quantity++;
    localStorage.setItem("cart", JSON.stringify(cartData));
    renderCart(cartData,subTotal);
  }
  }

// Decremnt
  function decrement(productId){
    const product = cartData.find(item => item.id === productId);
  if (product && product.quantity > 1) {
    product.quantity--;
    localStorage.setItem("cart", JSON.stringify(cartData));
    renderCart(cartData,subTotal);
  }
  }