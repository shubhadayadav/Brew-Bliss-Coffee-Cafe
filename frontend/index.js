new Swiper(".menu-scroll", {
  // Optional parameters
  slidesPerView: 3,
  spaceBetween: 30,
  //   loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Sending Data From Frontend to Backend

let form = document.getElementById("reservationForm");
let successPopup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");
const backHomeBtn = document.getElementById("backHomeBtn");
const selectDate = document.getElementById("user_selectDate");

const today = new Date().toISOString().split("T")[0];
// toISOString().split("T")[0]   //this is format to convert date in yyyy-mm-dd
// selectDate.min = today;
selectDate.setAttribute("min", today);

//when errror msg appears and we type in input field , error msg will disappear
const nameError = document.getElementById("nameError");
const nameInput = document.getElementById("name");
nameInput.addEventListener("input", () => {
  if (nameInput.value.trim() !== " ") {
    // alert(" Please Enter The Name");
    nameError.textContent = " ";
    // return false;
  }
});

const telnumError = document.getElementById("telnumError");
const telNumberInput = document.getElementById("user_number");
telNumberInput.addEventListener("input", () => {
  if (telNumberInput.value.trim() !== " ") {
    telnumError.textContent = " ";
  }
});

const emailidError = document.getElementById("emailidError");
const emailIdInput = document.getElementById("user_emialId");
emailIdInput.addEventListener("input", () => {
  if (emailIdInput.value.trim() !== " ") {
    emailidError.textContent = " ";
  }
});

const validateForm = () => {
  const name = document.getElementById("name").value.trim();
  const telNumber = document.getElementById("user_number").value.trim();
  const emailId = document.getElementById("user_emialId").value.trim();
  const selectDate = document.getElementById("user_selectDate").value;

  const nameError = document.getElementById("nameError");
  const telnumError = document.getElementById("telnumError");
  const emailidError = document.getElementById("emailidError");

  // Validaton starts from here

  if (name === "") {
    nameError.textContent = " Please Enter The Name ";
    return false;
  }

  // const telNumberPattern = /^[0-9]{10}$/;
  const telNumberPattern = /^[6-9][0-9]{9}$/;

  if (!telNumberPattern.test(telNumber)) {
    telnumError.textContent = " Please Enter a valid 10-digit Phone Number ";
    return false;
  }
  telnumError.textContent = "";

  const emailIdPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailIdPattern.test(emailId)) {
    emailidError.textContent = " Enter Valid Email ID ";
    return false;
  }
  return true;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log(" Form Submitted");
  // validateForm();

  const isvalid = validateForm();

  if (!isvalid) {
    return;
  }

  const telnumError = document.getElementById("telnumError");
  const emailidError = document.getElementById("emailidError");

  let reservationData = {
    name: document.getElementById("name").value,
    telNumber: document.getElementById("user_number").value,
    emailId: document.getElementById("user_emialId").value,
    selectDate: document.getElementById("user_selectDate").value,
    selectTime: document.getElementById("user_selectTime").value,
    Guests: document.getElementById("guests").value,
    indoor: document.getElementById("_indoor").checked,
    outdoor: document.getElementById("_outdoor").checked,
    noPreference: document.getElementById("no_prefer").checked,
    specialRequest: document.getElementById("special_request").value,
  };

  const response = await fetch("http://localhost:5000/api/reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log(data.field);
    console.log(data.message);
    if (data.field === "telNumber") {
      // console.log(telnumError);
      telnumError.textContent = `${data.message}`;
      return false;
    } else if (data.field === "emailId") {
      // console.log(telnumError);
      emailidError.textContent = `${data.message}`;
    }
    return;
  }

  if (response.ok) {
    nameError.textContent = " ";
    telnumError.textContent = "";
    emailidError.textContent = "";
    successPopup.style.display = "flex";

    form.reset();
  }

  console.log(data.reservation);
});

closePopup.addEventListener("click", () => {
  successPopup.style.display = "none";
});

backHomeBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
