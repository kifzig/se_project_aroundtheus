import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { closeModal } from "../utils/utils.js";
import { openModal } from "../utils/utils.js";

const initialCards = [
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

// List of all cards with images
const cardsList = document.querySelector(".cards__list");

// --------------------------------------
// VALIDATORS Settings for Forms
// ----------------------------------------

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// -------------PROFILE SECTION WITH Name, Picture, and Job-------------

// Form Fields filled in with information from profile page
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

// Edit Profile Form Modal Element
const editProfileModal = document.querySelector("#edit-modal");

// Input for Edit Profile Form Modal
const inputTitle = document.querySelector(".modal__input_type_title");
const inputDesc = document.querySelector(".modal__input_type_description");

// Edit Profile Form Validation
const editFormElement = editProfileModal.querySelector("#edit-profile-form");
const editFormValidator = new FormValidator(config, editFormElement);
editFormValidator.enableValidation();

// Edit Profile Button
const editProfileButton = document.querySelector(".profile__edit-button");

function fillProfileForm(profileTitle, profileDesc) {
  inputTitle.value = profileTitle;
  inputDesc.value = profileDesc;
}

function handleOpenEditProfileModal() {
  openModal(editProfileModal);
  fillProfileForm(profileTitle.textContent, profileDesc.textContent);
}

editProfileButton.addEventListener("click", handleOpenEditProfileModal);

// Functionality for Closing the Edit Profile Modal
const modalEditProfileCloseButton = document.querySelector(
  ".modal__close-button"
);

function closeEditProfileModal() {
  closeModal(editProfileModal);
}

// Save new Title (Name on Profile) and Description (Role or Job Title)
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileDesc.textContent = inputDesc.value;
  closeEditProfileModal();
}

editProfileModal.addEventListener("submit", handleProfileFormSubmit);

//---------------------------------------------------------------
//--------------ADD IMAGE MODAL----------------------------------
//---------------------------------------------------------------

// Add Image Modal Element
const addModal = document.querySelector("#add-modal");

// Inputs for Add Image modal
const inputCardPlace = document.querySelector(".modal__input_type_place");
const inputCardURL = document.querySelector(".modal__input_type_url");

// Add Image Form Validation
const addFormElement = addModal.querySelector("#add-image-form");
const addFormValidator = new FormValidator(config, addFormElement);
addFormValidator.enableValidation();

// Functionality for Opening the Add Image Modal
const addButton = document.querySelector(".profile__add-button");

function handleOpenAddImageModal() {
  openModal(addModal);
}

addButton.addEventListener("click", handleOpenAddImageModal);

function closeAddImageModal() {
  closeModal(addModal);
}

function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  const cardPlace = inputCardPlace.value;
  const cardUrl = inputCardURL.value;
  const newCardData = { name: cardPlace, link: cardUrl };
  const cardSelector = "#card__template";
  const newCard = new Card(newCardData, cardSelector);
  const newCardView = newCard.getView();
  console.log(newCardView);
  cardsList.prepend(newCardView);
  addFormElement.reset();
  addFormValidator.toggleButtonState();
  closeAddImageModal();
}

addFormElement.addEventListener("submit", handleAddImageFormSubmit);

// Functionality to close any modal by clicking outside of the form/image
const modals = document.querySelectorAll(".modal");
modals.forEach((modalElement) => {
  modalElement.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close-button")
    ) {
      closeModal(modalElement);
    }
  });
});

// Create a loop and add array initialCard to the webpage
// Using card class to create and add image cards with data from array, listeners

const cardSelector = "#card__template";
initialCards.forEach((card) => {
  const cardElement = new Card(card, cardSelector);
  cardsList.append(cardElement.getView());
});
