const mobileInput = document.querySelector(".mobileInput");
const submitButton =
  document.querySelector(".burger__form");
const alertBtn = document.querySelector(".alertDiv");
const username = document.querySelector("#name");

const dropContent =
  document.querySelectorAll(".dropContent");
const dropbtn = document.querySelector(".dropbtn");

let imageSrc = "./assests/images/flag/indiaflag.jpg";
let countryName = " IND";

dropContent.forEach((drop) => {
  drop.addEventListener("click", () => {
    imageSrc = `${drop.firstChild.src}`;
    countryName = drop.innerText;
    dropbtn.innerHTML = `<div><img src=${imageSrc} width="20" height="15"> ${countryName}</div>`;
  });
});

submitButton.addEventListener("submit", (e) => {
  e.preventDefault();
  const mobileNumber = mobileInput.value;

  if (mobileNumber.length !== 10) {
    // alert("Please enter 10 digit mobile number");
    alertBtn.classList.remove("alertDisable");
    alertBtn.classList.add("alertEnable");

    setTimeout(() => {
      alertBtn.classList.remove("alertEnable");
      alertBtn.classList.add("alertDisable");
    }, 5000);
  } else {
    window.location.href = "burger.html";

    localStorage.setItem("mobilenumber", mobileNumber);
    localStorage.setItem("countryname", imageSrc);
    localStorage.setItem("username", username.value);
    localStorage.setItem(
      "countryId",
      numberId(countryName),
    );
  }

  mobileInput.value = "";
  username.value = "";
});

function numberId(countryCode) {
  console.log(countryCode);
  switch (countryCode) {
    case " USA":
      countryId = 1;
      console.log(countryId);
      return countryId;
    case " BR":
      countryId = 55;
      return countryId;
    case " IND":
      countryId = 91;
      return countryId;
    case " ENG":
      countryId = 44;
      return countryId;
    default:
      countryId = 91;
      return countryId;
  }
}
