import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// import { closeModal } from "../utils/utils.js";
// import { openModal } from "../utils/utils.js";
import {
  profileTitle,
  profileDesc,
  inputTitle,
  inputDesc,
  editProfileModal,
  editProfileButton,
  previewImageModal,
  initialCards,
} from "../utils/constants.js";

// List of all cards with images
const cardsList = document.querySelector(".cards__list");

/* -------------------------------------------------------------------------- */
/*                        VALIDATORS Settings for forms                       */
/* -------------------------------------------------------------------------- */

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  formSelector: ".modal__form",
};

/* -------------------------------------------------------------------------- */
/*                             Validate All Forms                             */
/* -------------------------------------------------------------------------- */

// Enable validation for all forms with modal__form class

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
// const profileTitle = document.querySelector(".profile__title");
// const profileDesc = document.querySelector(".profile__description");

// // Edit Profile Form Modal Element
// const editProfileModal = document.querySelector("#edit-modal");

// Input for Edit Profile Form Modal
// const inputTitle = document.querySelector(".modal__input_type_title");
// const inputDesc = document.querySelector(".modal__input_type_description");

// Edit Profile Form Validation
const editFormElement = document.forms["edit-profile-form"];
const editFormValidator = new FormValidator(config, editFormElement);
editFormValidator.enableValidation();

// // Edit Profile Button
// const editProfileButton = document.querySelector(".profile__edit-button");

function fillProfileForm(profileTitle, profileDesc) {
  inputTitle.value = profileTitle;
  inputDesc.value = profileDesc;
}

// First instance of opening a popup
// const editProfilePopup = new PopupWithForm(editProfileModal, );

// const EditProfilePopupRenderer = function ({title, desc})

function handleOpenEditProfileModal() {
  openModal(editProfileModal);
  fillProfileForm(profileTitle.textContent, profileDesc.textContent);
}

//For handling open Edit Profile button
editProfileButton.addEventListener("click", handleOpenEditProfileModal);

// Functionality for Closing the Edit Profile Modal
// Closing the Edit Profile modal
const modalEditProfileCloseButton = document.querySelector(
  ".modal__close-button"
);

function closeEditProfileModal() {
  //closeModal(editProfileModal);
}

// Save new Title (Name on Profile) and Description (Role or Job Title)
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileDesc.textContent = inputDesc.value;
  closeEditProfileModal();
}

editProfileModal.addEventListener("submit", handleProfileFormSubmit);

/*
const handleFmSubmit = function (evt) {
  alert("Form submitted");
};

const editProfilePopup = new PopupWithForm(EditProfileModal, handleFmSubmit);
*/

/* -------------------------------------------------------------------------- */
/*                               Add Image Modal                              */
/* -------------------------------------------------------------------------- */

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
  //closeModal(addModal);
}

// const handleCardClick = (data) => {
//   const previewImagePopup = new PopupWithImage("#preview-image-modal");
//   previewImagePopup.open(data);
// };

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

/*
// Functionality to close any modal by clicking outside of the form/image
const modals = document.querySelectorAll(".modal");
modals.forEach((modalElement) => {
  modalElement.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close-button")
    ) {
      //closeModal(modalElement);
    }
  });
});
*/

// Create a loop and add array initialCard to the webpage
// Using card class to create and add image cards with data from array, listeners

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  const cardView = getCardView(card);
  addCardView(cardView);
});
