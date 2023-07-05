import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithFormConfirmDelete from "../components/PopupWithFormConfirmDelete.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import "./index.css";

import {
  config,
  inputTitle,
  inputDesc,
  editProfileButton,
  editProfileModalSelector,
  changeProfilePicModalSelector,
  profileImage,
  profilePicUrlSelector,
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

let myUserID = null;

myUserID = api.whoAmI().then((response) => {
  return response._id;
});

let cardList;

api.getInitialCards("cards").then((cards) => {
  api.whoAmI().then((response) => {
    cardList = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = createCard(item, response._id);
          cardList.addItem(card);
        },
      },
      cardListSelector
    );
    cardList.renderItems();
  });
});

const user = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

api.getUserInfo("users", "me").then((response) => {
  user.setUserInfo(response.name, response.about);
  user.setProfileImage(response.avatar);
  user.setMyID(response._id);
  myUserID = response._id;
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
/*                               Change Profile Pic Modal                     */
/* -------------------------------------------------------------------------- */

const changeProfilePicPopup = new PopupWithForm(
  changeProfilePicModalSelector,
  handleChangeProfilePicSubmit
);

function handleChangeProfilePicSubmit(data) {
  // user.setProfileImage(imgLink);
  // api.updateProfilePic(imgLink);
  renderSaving(changeProfilePicModalSelector, true);
  api
    .updateProfilePic(data.profilepicurl)
    .then((response) => {
      user.setProfileImage(data.profilepicurl);
      changeProfilePicPopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderSaving(editProfileModalSelector, false);
    });
}

function handleOpenChangeProfilePicModal() {
  formValidators["change-profile-pic-form"].toggleButtonState();
  changeProfilePicPopup.open();
}

//For handling open Edit Profile button
profileImage.addEventListener("click", handleOpenChangeProfilePicModal);

/* -------------------------------------------------------------------------- */
/*                               Edit Profile Modal                           */
/* -------------------------------------------------------------------------- */

const profilePopup = new PopupWithForm(
  editProfileModalSelector,
  handleProfileFormSubmit
);

function handleProfileFormSubmit({ title, description }) {
  renderSaving(editProfileModalSelector, true);
  api
    .editProfile("users", "me", title, description)
    .then((response) => {
      user.setUserInfo(title, description);
      profilePopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderSaving(editProfileModalSelector, false);
    });
}

function renderSaving(popupSelector, isLoading = false) {
  const saveButtonEl = document.querySelector(
    `${popupSelector} .modal__button`
  );
  if (isLoading) {
    saveButtonEl.textContent = "Saving...";
  } else {
    saveButtonEl.textContent = "Save";
  }
}

function renderCreating(popupSelector, isLoading = false) {
  const saveButtonEl = document.querySelector(
    `${popupSelector} .modal__button`
  );
  if (isLoading) {
    saveButtonEl.textContent = "Creating...";
  } else {
    saveButtonEl.textContent = "Create";
  }
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
  renderCreating("#add-modal", true);
  api
    .addImageToApi("cards", place, url)
    .then((card) => {
      const newCard = createCard(card, myUserID);
      cardList.addItem(newCard);
      addImagePopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderCreating(editProfileModalSelector, false);
    });
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

const deleteImageConfirmPopup = new PopupWithFormConfirmDelete(
  "#confirm-modal",
  handleDeleteImageSubmit
);

function handleDeleteImageSubmit(data) {
  api.removeImageFromAPI("cards", data.imageId);
  let cardToDelete = document.getElementById(data.imageId);
  cardToDelete.remove();
  cardToDelete = null;
  deleteImageConfirmPopup.close();
}

const cardListSelector = ".cards__list";

function handleCardClick(data) {
  previewImagePopup.open(data);
}

function handleDeleteImagePopup(data) {
  deleteImageConfirmPopup.open(data);
}

function handleLikeClick(card) {
  if (card.isLiked()) {
    api.removeLikeFromAPI("cards/likes", card.imageID).then((res) => {
      console.log(res);
      card.setLikesInfo(res.likes.length);
    });
  } else {
    api.addLikeToAPI("cards/likes", card.imageID).then((res) => {
      console.log(res);
      card.setLikesInfo(res.likes.length);
    });
  }
}

function createCard(data, myUserID) {
  //Creates a card object with html with data {"name", "link"}
  const cardSelector = "#card__template";
  const newCard = new Card(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteImagePopup,
    handleLikeClick,
    myUserID
  );
  return newCard.getView();
}
