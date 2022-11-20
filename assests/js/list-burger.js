const numberId = document.getElementById("numberId");
const username = document.getElementById("username");

username.innerHTML = localStorage.getItem("username");

numberId.innerHTML = `<img src=${localStorage.getItem(
  "countryname",
)} id="countrysrc" width="25" height="15" alt="country"> +${localStorage.getItem(
  "countryId",
)} ${localStorage.getItem("mobilenumber")}`;

let burgerCategory = "";
let price;

const cart = [];
const localCart =
  JSON.parse(localStorage.getItem("localCart")) || [];

const eggBurger = document.querySelector(".egg");
const vegBurger = document.querySelector(".veg");
const chickenBurger = document.querySelector(".chicken");
const modalHeader = document.getElementById(
  "exampleModalLabel",
);
const cartItems = document.getElementById("cartItems");

document
  .querySelector("#cart")
  .addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "cart.html";
  });

document
  .querySelector("#goToCartButton")
  .addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "cart.html";
  });

window.onload = () => {
  if (
    localStorage.getItem("countryname") &&
    localStorage.getItem("mobilenumber") &&
    localStorage.getItem("username")
  ) {
    cartItems.innerText = localCart.length;
  } else {
    alert("Your are Logged Out Please Sign in");
    window.location.href = "/";
  }
};

eggBurger.addEventListener("click", () => {
  modalHeader.innerHTML = "Egg Burger";
  burgerCategory = "Egg Burger";
  price = 150;
});

vegBurger.addEventListener("click", () => {
  modalHeader.innerHTML = "Veg Burger";
  burgerCategory = "Veg Burger";
  price = 100;
});

chickenBurger.addEventListener("click", () => {
  modalHeader.innerHTML = "Chicken Burger";
  burgerCategory = "Chicken Burger";
  price = 200;
});

const cartBtnAdd = document.querySelectorAll("#cartBtnAdd");
const cartBtnMinus =
  document.querySelectorAll("#cartBtnMinus");
const addToCartButton = document.querySelector(
  "#addToCartButton",
);
const cartItemsList = document.querySelectorAll(
  ".cartItemsList",
);
const alertBtn = document.querySelector(".alertDiv");

cartBtnAdd.forEach((ct) => {
  ct.addEventListener("click", (e) => {
    const burgerName =
      e.target.parentElement.parentElement.firstElementChild
        .lastElementChild.innerText;
    const cartItem = {
      name: burgerName,
      category: burgerCategory,
      price: price,
      quantity: 1,
    };

    let flag = 0;

    for (let i = 0; i < cart.length; i++) {
      if (
        cart[i].name === cartItem.name &&
        cart[i].category === cartItem.category
      ) {
        flag = 1;
        cart[i].quantity++;
      }
    }

    if (flag === 0) {
      cart.push(cartItem);
    }

    const noOfCartItem = Number(
      e.target.previousElementSibling.innerHTML,
    );

    e.target.previousElementSibling.previousElementSibling.classList.add(
      "enabled",
    );

    e.target.previousElementSibling.innerHTML =
      noOfCartItem + 1;
  });
});

cartBtnMinus.forEach((ct) => {
  if (cart.length === 0) {
    ct.classList.add("disabled");
  }

  ct.addEventListener("click", (e) => {
    const burgerName =
      e.target.parentElement.parentElement.firstElementChild
        .lastElementChild.innerText;
    const cartItem = {
      name: burgerName,
      category: burgerCategory,
      price: price,
      quantity: 1,
    };

    let flag = 0;

    for (let i = 0; i < cart.length; i++) {
      if (
        cart[i].name === cartItem.name &&
        cart[i].category === cartItem.category
      ) {
        flag = 1;
        cart[i].quantity--;
      }
    }

    const noOfCartItem = Number(
      e.target.nextElementSibling.innerHTML,
    );

    if (noOfCartItem > 0) {
      e.target.nextElementSibling.innerHTML =
        noOfCartItem - 1;
    }

    if (noOfCartItem === 0) {
      ct.classList.add("disabled");
      ct.classList.remove("enabled");
    }
  });
});

addToCartButton.addEventListener("click", (e) => {
  cartItems.innerText = cart.length;
  localStorage.setItem("localCart", JSON.stringify(cart));

  cartItemsList.forEach((cart) => {
    cart.innerHTML = 0;
  });

  cartBtnMinus.forEach((btn) => {
    btn.classList.add("disabled");
    btn.classList.remove("enabled");
  });

  if (cart.length > 0) {
    $("#mymodal").modal("hide");

    alertBtn.classList.remove("alertDisable");
    alertBtn.classList.add("alertEnable");

    setTimeout(() => {
      alertBtn.classList.remove("alertEnable");
      alertBtn.classList.add("alertDisable");
    }, 1500);
  }
});
