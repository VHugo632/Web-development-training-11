// Elements

const body = document.body;

const loader = document.getElementById("loader");

const menu = document.getElementById("menu");
const mobile_navbar = menu.getElementsByTagName("nav")[0];

const menu_icon = document.getElementById("menu_icon");
const menu_close = document.getElementById("menu_close_icon");

const central_picture = document.getElementById("central_picture");
const thumbnails = document.getElementById("thumbnails").getElementsByTagName("li");
const slider_buttons = document.getElementsByClassName("step");

let current_picture = 0;
const central_picture_steps = ["0%", "-25%", "-50%", "-75%"];

const lightbox = document.getElementById("lightbox");
const close_lightbox_icon = document.getElementById("close_lightbox").getElementsByTagName("img")[0];
const zoom_pictures = document.getElementById("zoom").getElementsByTagName("ul")[0].getElementsByTagName("li");

let current_amount = 0;
const amount_buttons = document.getElementById("amount").getElementsByTagName("img");
const amount_display = document.getElementById("amount").getElementsByTagName("p")[0];

let total_amount_cart = 0;
const submit = document.getElementById("submit");
const cart_icon = document.getElementById("cart_icon");

let cart_displayed = false;
const cart = document.getElementById("cart");
const cart_products = document.getElementById("products");

const results_spans = document.getElementById("results").getElementsByTagName("span");
const price = 125.00;

const delete_icon = document.getElementById("delete_icon");

// Functions

/* openMenu : open the mobile menu */
function openMenu() {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    body.style.overflowY = "hidden";
    menu.style.display = "flex";
    setTimeout(function() {     // To get the transition, I need to set a slight delay (1ms) after having edited the "display" property
        menu.style.filter = "opacity(100%)";
        mobile_navbar.style.transform = "translateX(0%)";
    }, 1)
}

/* closeMenu : close the mobile menu */
function closeMenu() {
    menu.style.filter = "opacity(0%)";
    mobile_navbar.style.transform = "translateX(-100%)";
    setTimeout(function() {     // I need to set a delay (equal to the transition duration : "0.3s" so "300ms") to avoid cutting the transition
        menu.style.display = "none";
        body.style.overflowY = "visible";
    }, 300)
}

/* changeSelectedThumbnail : select a new thumbnail to display differently (when the user clicks on it) and reset the old one */
function changeSelectedThumbnail(thumbnail, index) {
    if (index != current_picture) {
        thumbnails[current_picture].classList.remove("selected");
        zoom_pictures[current_picture].classList.remove("focus");
        current_picture = index;
        thumbnail.classList.add("selected");
        zoom_pictures[current_picture].classList.add("focus");
    }
}

/* changeCentralPicture : scroll the "central_picture" element to display the correct picture */
function changeCentralPicture() {
    central_picture.style.transform = "translateX(" + central_picture_steps[current_picture] + ")";
}

/* changeCentralPictureMobile : similar to the "changeSelectedThumbnail" function but adapted for mobile use (next or previous) */
function changeCentralPictureMobile(index) {
    thumbnails[current_picture].classList.remove("selected");
    zoom_pictures[current_picture].classList.remove("focus");
    if (index == 1) {
        current_picture = current_picture + 1;
        if (current_picture > thumbnails.length - 1) {
            current_picture = 0;
        }
    }
    else {
        current_picture = current_picture - 1;
        if (current_picture < 0) {
            current_picture = thumbnails.length - 1;
        }
    }
    thumbnails[current_picture].classList.add("selected");
    zoom_pictures[current_picture].classList.add("focus");
}

/* openLightbox : open the lightbox (similar to the "openMenu" function) */
function openLightbox() {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    body.style.overflowY = "hidden";
    lightbox.style.display = "flex";
    setTimeout(function() {
        lightbox.style.filter = "opacity(100%)";
    }, 1)
}

/* closeLightbox : close the lightbox (similar to the "closeMenu" function) */
function closeLightbox() {
    lightbox.style.filter = "opacity(0%)";
    setTimeout(function() {
        lightbox.style.display = "none";
        body.style.overflowY = "visible";
    }, 300)
}

/* openCart : open the cart (similar to the "openMenu" and "openLightbox" functions) */
function openCart() {
    cart_displayed = true;
    cart.style.display = "flex";
    setTimeout(function() {
        cart.style.filter = "opacity(100%)";
    }, 1)
}

/* closeCart : close the cart (similar to the "closeMenu" and "closeLightbox" functions) */
function closeCart() {
    cart_displayed = false;
    cart.style.filter = "opacity(0%)";
    setTimeout(function() {
        cart.style.display = "none";
    }, 300)
}

/* editAmountProduct : edit the amount of products to add to the cart depending on which button the user clicks on (plus or minus) */
function editAmountProduct(index) {
    if (((current_amount <= 0) && (index == 0)) == false) {
        if (index == 1) {
            current_amount = current_amount + 1;
        }
        else {
            current_amount = current_amount - 1;
        }
        amount_display.innerText = current_amount;
    }
}

/* addToCart : add the correct amount of the product to the cart */
function addToCart() {
    if (current_amount > 0) {
        if (total_amount_cart <= 0) {
            cart_icon.classList.remove("empty");
            cart_products.classList.remove("empty");
        }
        total_amount_cart = total_amount_cart + current_amount;
        localStorage.setItem("total_amount_cart", total_amount_cart);   // When the user adds at least one product to the cart, I keep the information in the "localStorage"
        cart_icon.style.setProperty("--total_amount", '"' + total_amount_cart + '"');   // I add the amount of the product to "content" property of the pseudo-element with "--total_amount" variable
        results_spans[0].innerText = total_amount_cart;
        results_spans[1].innerText = "$" + ((price * total_amount_cart).toFixed(2));
        current_amount = 0;
        amount_display.innerText = current_amount;
    }
}

/* removeFromCart : remove all products from the cart */
function removeFromCart() {
    cart_icon.classList.add("empty");
    cart_products.classList.add("empty");
    setTimeout(function() {
        cart_icon.style.setProperty("--total_amount", "");  // I remove the amount of the product from "content" property of the pseudo-element by leaving the "--total_amount" variable empty
    }, 200)
    total_amount_cart = 0;
    localStorage.clear();   // When the user removes the products from the cart, I clear the "localStorage"
    results_spans[0].innerText = "";
    results_spans[1].innerText = "";
}

// Events

menu_icon.addEventListener("click", openMenu);
menu_close.addEventListener("click", closeMenu);

for (let index = 0; index < thumbnails.length; index = index + 1) {
    thumbnails[index].addEventListener("click", function() {
        changeSelectedThumbnail(thumbnails[index], index);
        changeCentralPicture();
    });
}

for (let index = 0; index < slider_buttons.length; index = index + 1) {
    slider_buttons[index].addEventListener("click", function() {
        changeCentralPictureMobile(index);
        changeCentralPicture();
    });
}

central_picture.addEventListener("click", openLightbox);
close_lightbox_icon.addEventListener("click", closeLightbox);

cart_icon.addEventListener("click", function() {
    if (cart_displayed == false) {
        openCart();
    }
    else {
        closeCart();
    }
})

for (let index = 0; index < amount_buttons.length; index = index + 1) {
    amount_buttons[index].addEventListener("click", function() {
        editAmountProduct(index);
    })
}

submit.addEventListener("click", addToCart);
delete_icon.addEventListener("click", removeFromCart);

// On page load

window.addEventListener("load", function() {    // When the page is fully loaded, the loader disappears (I use "setTimeout" to get the transition)
    setTimeout(function() {
        loader.style.transform = "translateY(-100%)";
        setTimeout(function() {     // When the transition is finished, I remove the element from the DOM and enable scrolling on the "body"
            loader.remove();
            body.style.overflowY = "visible";
        }, 400)
    }, 1500)
})

if (localStorage.getItem("total_amount_cart") != null) {    // I check if there is at least one product to the cart (if yes, I automatically add the same amount to the cart)
    current_amount = parseInt(localStorage.getItem("total_amount_cart"));
    addToCart();
}