let cartItems =
  JSON.parse(localStorage.getItem("localCart")) || [];
const mycartId = document.getElementById("mycartId");
const alertBtn = document.querySelector(".alertDiv");
const mobileNumber = document.getElementById("phone");
const numberId = document.getElementById("numberId");

let burgerQuantity = 0;
let price = 0;

document.getElementById(
  "cartItemsLength",
).innerText = `${cartItems.length} Items`;
mobileNumber.innerText =
  localStorage.getItem("mobilenumber");
numberId.innerText = localStorage.getItem("countryId");

window.onload = () => {
  if (
    !localStorage.getItem("countryname") &&
    !localStorage.getItem("mobilenumber") &&
    !localStorage.getItem("username")
  ) {
    alert("Your are Logged Out Please Sign in");
    window.location.href = "/";
  }
};

const imageContainer = [
  "./assests/images/burger-list/Crispy.jfif",
  "./assests/images/burger-list/surprise.webp",
  "./assests/images/burger-list/whopper.webp",
  "./assests/images/burger-list/chilli.webp",
  "./assests/images/burger-list/tandoor.png",
];

if (cartItems.length <= 0) {
  mycartId.innerHTML = `<h1 style="margin-left: 30px;">No Items Found</h1>`;
}
cartItems.forEach((item) => {
  const randomNumber = Math.floor(Math.random() * 5);
  mycartId.innerHTML += `<div class="mycart" >
        <div class="mycart__image">
            <img src=${imageContainer[randomNumber]} alt="">
        </div>
    
        <div class="mycart__details">
            <h1>Name: <span id="name">${item.name} </span> </h1>
            <h2>Category: <span id="category">${item.category} </span> </h2>
            <p>Price: <span id="price">Rs ${item.price}</span> </p>
        </div>
    
        <div class="mycart__qty">
            <p>Qty: <span>${item.quantity}</span></p>
            <button id="remove">Remove</button
        </div>
    </div>`;

  burgerQuantity += item.quantity;
  price += item.quantity * item.price;
});

document.getElementById(
  "cartItemsQuantity",
).innerHTML = `Quantity: ${burgerQuantity}`;

document.getElementById(
  "cartItemsPrice",
).innerHTML = `Total Price: Rs ${price}`;

const removeBtn = document.querySelectorAll("#remove");

removeBtn.forEach((remove) => {
  remove.addEventListener("click", (e) => {
    const name =
      e.target.parentElement.previousElementSibling
        .firstElementChild.lastElementChild.innerText;
    const category =
      e.target.parentElement.previousElementSibling
        .firstElementChild.nextElementSibling
        .lastElementChild.innerText;
    let updatedArray = [];

    cartItems.forEach((cart, index) => {
      console.log(name, cart.name, category, cart.category);
      if (
        cart.name === name &&
        cart.category === category
      ) {
        const first = cartItems.slice(0, index);
        const second = cartItems.slice(index + 1);
        updatedArray = [...first, ...second];
      }
    });
    // updatedArray = [..., ...cartItems(indexId + 1, cartItems.length)]
    console.log(updatedArray);
    cartItems = updatedArray;
    localStorage.setItem(
      "localCart",
      JSON.stringify(cartItems),
    );

    // window.location.href = "cart.html"
    window.location.reload();
  });
});

const placeOrder = document.querySelector(".placeOrder");

placeOrder.addEventListener("click", () => {
  alertBtn.classList.remove("alertDisable");
  alertBtn.classList.add("alertEnable");

  setTimeout(() => {
    alertBtn.classList.remove("alertEnable");
    alertBtn.classList.add("alertDisable");

    localStorage.removeItem("localCart");
    localStorage.removeItem("mobilenumber");
    localStorage.removeItem("username");
    localStorage.removeItem("countryname");
    localStorage.removeItem("countryId");

    window.location.href = "index.html";
  }, 2000);
});
