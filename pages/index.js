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
    name: "Lake Erie Park",
    link: "https://images.unsplash.com/photo-1604173413099-cd2b0493bb7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Cuyahoga Valley",
    link: "https://images.unsplash.com/photo-1604448446634-6afe5d3882c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
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
  formSelector: ".modal__form",
};

// ------------------------------------------------
// Validate All Forms
//-------------------------------------------------

// enable validation

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // here you get the name of the form
    const formName = formElement.getAttribute("name");
    // here you store a validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

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
const editFormElement = document.forms["edit-profile-form"];
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

// For for Add Image modal
const addFormElement = document.forms["add-image-form"];

// Functionality for Opening the Add Image Modal
const addButton = document.querySelector(".profile__add-button");

function handleOpenAddImageModal() {
  openModal(addModal);
}

addButton.addEventListener("click", handleOpenAddImageModal);

function closeAddImageModal() {
  closeModal(addModal);
}

function createCard(data) {
  //Creates a card object with data {"name", "link"}
  const cardSelector = "#card__template";
  const newCard = new Card(data, cardSelector);
  return newCard;
}

function getCardView(card) {
  // Takes card data {"name", "link"} and creates the html to get it ready to insert into DOM
  const newCardView = card.getView();
  return newCardView;
}

function addCardView(cardView) {
  //Adds filled card with html to DOM
  cardsList.prepend(cardView);
}

function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  const cardPlace = inputCardPlace.value;
  const cardUrl = inputCardURL.value;
  const newCardData = { name: cardPlace, link: cardUrl };
  const newCard = createCard(newCardData);
  const newCardView = getCardView(newCard);
  addCardView(newCardView);
  addFormElement.reset();
  formValidators["add-image-form"].toggleButtonState();
  //addFormValidator.toggleButtonState();
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

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  const cardView = getCardView(card);
  addCardView(cardView);
});
