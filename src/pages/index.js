import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import "./index.css";

import {
  config,
  inputTitle,
  inputDesc,
  editProfileButton,
  editProfileModalSelector,
} from "../utils/constants.js";

/* -------------------------------------------------------------------------- */
/*                             API                                            */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "dfa65752-2d8e-401e-8af5-014c787612d4",
    "Content-Type": "application/json",
  },
});

const myUserID = "7504a7a02fdb23515b5da020";

let cardList;

api.getInitialCards("cards").then((cards) => {
  cardList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = createCard(item);
        cardList.addItem(card);
      },
    },
    cardListSelector
  );
  cardList.renderItems();
});

const user = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

api.getUserInfo("users", "me").then((u) => {
  user.setUserInfo(u.name, u.about);
  user.setProfileImage(u.avatar);
});

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

const profilePopup = new PopupWithForm(
  editProfileModalSelector,
  handleProfileFormSubmit
);

function handleProfileFormSubmit({ title, description }) {
  user.setUserInfo(title, description);
  api.editProfile("users", "me", title, description);
  profilePopup.close();
}

function handleOpenEditProfileModal() {
  const { profileName, description } = user.getUserInfo();
  inputTitle.value = profileName;
  inputDesc.value = description;
  formValidators["edit-profile-form"].toggleButtonState();
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
  api.addImageToApi("cards", place, url).then((card) => {
    const newCard = createCard(card);
    // I might need to edit this--does all the info arrive
    cardList.addItem(newCard);
  });

  addImagePopup.close();
}

function handleOpenAddImageModal() {
  formValidators["add-image-form"].toggleButtonState();
  addImagePopup.open();
}

addButton.addEventListener("click", handleOpenAddImageModal);

/* -------------------------------------------------------------------------- */
/*                               Card Functions                               */
/* -------------------------------------------------------------------------- */

const previewImagePopup = new PopupWithImage("#preview-image-modal");

const deleteImageConfirmPopup = new PopupWithForm(
  "#confirm-modal",
  handleDeleteImageSubmit
);

function handleDeleteImageSubmit(imageId) {
  console.log("handle delete image submit");
  api.removeImageFromAPI("cards", imageId);
  deleteImageConfirmPopup.close();
}

const cardListSelector = ".cards__list";

function handleCardClick(data) {
  previewImagePopup.open(data);
}

function handleDeletePopup(imageId) {
  deleteImageConfirmPopup.open(imageId);
  // api.removeImageFromAPI("cards", imageId);
  // Delete an image using the API - this works //
  //api.removeImageFromAPI("cards", "649847d3915f5d0902c31bae");
}

function createCard(data) {
  //Creates a card object with html with data {"name", "link"}
  const cardSelector = "#card__template";
  const newCard = new Card(
    data,
    cardSelector,
    handleCardClick,
    handleDeletePopup,
    myUserID
  );
  return newCard.getView();
}

/*
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  cardListSelector
);

*/

//cardList.renderItems();
