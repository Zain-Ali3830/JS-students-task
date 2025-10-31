const wishlistArray=JSON.parse(localStorage.getItem("wishlist"))||[];
function renderWishlist(data){
    const wishlistContainer = document.getElementById("wishlistContainer");
    wishlistContainer.innerHTML = "";

    if (data.length === 0) {
        wishlistContainer.innerHTML = "<p>Your wishlist is empty</p>";
        return;
    }

    data.forEach((product) => {
        const wishlistCard = document.createElement("div");
        wishlistCard.classList.add("wishlistCard");

        wishlistCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.title.slice(0, 15) }</h3>
            <p>${product.price}</p>
            <button class="removeFromWishlist">Remove from Wishlist</button>
        `;

        wishlistCard.querySelector(".removeFromWishlist").addEventListener("click", () => removeFromWishlist(product));
        wishlistContainer.append(wishlistCard);
    });

}


renderWishlist(wishlistArray);



// remove from wishlist 

function removeFromWishlist(product){
    console.log(wishlistArray)
    const exists= wishlistArray.find((item) => item.id === product.id);
    if(exists){
        wishlistArray.splice(wishlistArray.indexOf(exists), 1);
        console.log("Removed from Wishlist:", product);
        localStorage.setItem("wishlist", JSON.stringify(wishlistArray));
        console.log("Removed from Wishlist:", product);
        alert("Removed from Wishlist");
        renderWishlist(wishlistArray);
    }
    console.log("Wishlist Array:", wishlistArray);
}



// Search from wishlist

function searchItems(data) {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = data.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm);
      });
      renderWishlist(filteredData);
    });
  }


  searchItems(wishlistArray);