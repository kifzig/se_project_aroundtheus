let initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Form Fields field in with information from profile page
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const inputTitle = document.querySelector(".modal__input_type_title");
const inputDesc = document.querySelector(".modal__input_type_description");

/* Functionality for Opening the Edit Profile Modal */
let editButton = document.querySelector(".profile__edit-button");

function openModal() {
  let modal = document.querySelector(".modal");
  modal.classList.add("modal__opened");
  inputTitle.value = profileTitle.textContent;
  inputDesc.value = profileDesc.textContent;
}

editButton.addEventListener("click", openModal);

/* Functionality for Closing the Edit Profile Modal */
let modalCloseButton = document.querySelector(".modal__close");

function closeModal() {
  let modal = document.querySelector(".modal");
  modal.classList.remove("modal__opened");
}

modalCloseButton.addEventListener("click", closeModal);

/*Save edited title and description */

const modalForm = document.querySelector(".modal__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  console.log("Save button clicked");
  profileTitle.textContent = inputTitle.value;
  profileDesc.textContent = inputDesc.value;
  closeModal();
}

modalForm.addEventListener("submit", handleProfileFormSubmit);

/* Rending cards from array with html template element */

function getCardElement(data) {
  //Clone the template element with all its content and store in a cardElement variable
  //Access the card title and image and store them in variables
  //Set the path of the image to the link field of the object
  //Set the image alt text to the name field of the object
  //Set the card title to the name field of the object, too
  //Return the ready HTML element with the filled in data
}

//Create a loop and run getCardElement over the array initialCards
// In the loop, use appropriate built-in DOM method to add HTML element to this page
