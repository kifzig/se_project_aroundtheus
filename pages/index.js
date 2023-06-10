import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
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
  editProfileModalSelector,
  inputSelector,
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

// function fillProfileForm(profileTitle, profileDesc) {
//   inputTitle.value = profileTitle;
//   inputDesc.value = profileDesc;
// }

// -- First instance of opening a popup
// --  const editProfilePopup = new PopupWithForm(editProfileModal, );
// --const EditProfilePopupRenderer = function ({title, desc})

// Save new Title (Name on Profile) and Description (Role or Job Title)

const profilePopup = new PopupWithForm(
  editProfileModalSelector,
  handleProfileFormSubmit
);

const newUser = new UserInfo(".profile__title", ".profile__description");

function handleProfileFormSubmit({ title, description }) {
  newUser.setUserInfo(title, description);
  profilePopup.close();
}

function handleOpenEditProfileModal() {
  newUser.setUserInfo(profileTitle.textContent, profileDesc.textContent);

  inputTitle.value = profileTitle.textContent;
  inputDesc.value = profileDesc.textContent;

  profilePopup.open();
}

//For handling open Edit Profile button
editProfileButton.addEventListener("click", handleOpenEditProfileModal);

// editProfileModal.addEventListener("submit", handleProfileFormSubmit);

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

//New Functionality with New Popup Classes
const addButton = document.querySelector(".profile__add-button");
const addImagePopup = new PopupWithForm("#add-modal", testHandler);

let count = 1;

function testHandler({ place, url }) {
  const newCardData = { name: place, link: url };
  const newCard = createCard(newCardData);
  const newCardView = getCardView(newCard);
  addCardView(newCardView);
  console.log(count++);
  formValidators["add-image-form"].toggleButtonState();
  addImagePopup.close();
}

function handleOpenAddImageModal() {
  // openModal(addModal);
  addImagePopup.open();
}

addButton.addEventListener("click", handleOpenAddImageModal);

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

// function handleAddImageFormSubmit(evt) {
//   evt.preventDefault();
//   const cardPlace = inputCardPlace.value;
//   const cardUrl = inputCardURL.value;
//   const newCardData = { name: cardPlace, link: cardUrl };
//   const newCard = createCard(newCardData);
//   const newCardView = getCardView(newCard);
//   addCardView(newCardView);
//   addFormElement.reset();
//   formValidators["add-image-form"].toggleButtonState();
//   //addFormValidator.toggleButtonState();
//   closeAddImageModal();
// }

// addFormElement.addEventListener("submit", handleAddImageFormSubmit);

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  const cardView = getCardView(card);
  addCardView(cardView);
});
