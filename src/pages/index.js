import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "./index.css";

// import { closeModal } from "../utils/utils.js";
// import { openModal } from "../utils/utils.js";
import {
  profileTitle,
  profileDesc,
  inputTitle,
  inputDesc,
  editProfileButton,
  initialCards,
  editProfileModalSelector,
} from "../utils/constants.js";

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

/* -------------------------------------------------------------------------- */
/*                               Edit Profile Modal                           */
/* -------------------------------------------------------------------------- */

// Edit Profile Form Validation
const editFormElement = document.forms["edit-profile-form"];
const editFormValidator = new FormValidator(config, editFormElement);
editFormValidator.enableValidation();

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

/* -------------------------------------------------------------------------- */
/*                               Add Image Modal                              */
/* -------------------------------------------------------------------------- */

// Functionality for Opening the Add Image Modal
const addButton = document.querySelector(".profile__add-button");
const addImagePopup = new PopupWithForm("#add-modal", handleAddImageSubmit);

function handleAddImageSubmit({ place, url }) {
  const newCardData = { name: place, link: url };
  const newCard = createCard(newCardData);
  const newCardView = getCardView(newCard);
  cardList.addItem(newCardView);
  formValidators["add-image-form"].toggleButtonState();
  addImagePopup.close();
}

function handleOpenAddImageModal() {
  addImagePopup.open();
}

addButton.addEventListener("click", handleOpenAddImageModal);

/* -------------------------------------------------------------------------- */
/*                               Card Functions                               */
/* -------------------------------------------------------------------------- */

const previewImagePopup = new PopupWithImage("#preview-image-modal");
const cardListSelector = ".cards__list";

function handleCardClick(data) {
  previewImagePopup.open(data);
}

function createCard(data) {
  //Creates a card object with data {"name", "link"}
  const cardSelector = "#card__template";
  const newCard = new Card(data, cardSelector, handleCardClick);
  return newCard;
}

function getCardView(card) {
  // Takes card data {"name", "link"} and creates the html to get it ready to insert into DOM
  const newCardView = card.getView();
  return newCardView;
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card__template", handleCardClick);
      const cardView = card.getView();
      cardList.addItem(cardView);
    },
  },
  cardListSelector
);

cardList.renderItems();
