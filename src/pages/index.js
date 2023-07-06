import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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

let cardList;
let cards;

const user = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

api
  .getInitialData("cards")
  .then((data) => {
    cards = data;
    return api.getUserInfo();
  })
  .then((response) => {
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

    user.setUserInfo(response.name, response.about);
    user.setProfileImage(response.avatar);
  })
  .catch((err) => {
    console.error(err);
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
  handleChangeProfilePicSubmit,
  "Save",
  "Saving..."
);

function handleChangeProfilePicSubmit(data) {
  changeProfilePicPopup.showLoading();
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
      changeProfilePicPopup.hideLoading();
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
  handleProfileFormSubmit,
  "Save",
  "Saving..."
);

function handleProfileFormSubmit({ title, description }) {
  profilePopup.showLoading();
  api
    .editProfile("users", "me", title, description)
    .then((response) => {
      user.setUserInfo(title, description);
      profilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profilePopup.hideLoading();
    });
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
const addImagePopup = new PopupWithForm(
  "#add-modal",
  handleAddImageSubmit,
  "Create",
  "Creating..."
);

function handleAddImageSubmit({ place, url }) {
  addImagePopup.showLoading();
  api
    .addImageToApi(place, url)
    .then((card) => {
      const newCard = createCard(card, card.owner._id);
      cardList.addItem(newCard);
      addImagePopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      addImagePopup.hideLoading();
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

const deleteImageConfirmPopup = new PopupWithConfirmation(
  "#confirm-modal",
  handleDeleteImageSubmit,
  "Yes",
  "Deleting..."
);

function handleDeleteImageSubmit(card) {
  deleteImageConfirmPopup.showLoading();

  api
    .removeImageFromAPI(card.imageID)
    .then((data) => {
      card.handleDeleteCard();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      deleteImageConfirmPopup.hideLoading();
      deleteImageConfirmPopup.close();
    });
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
    api
      .removeLikeFromAPI("cards/likes", card.imageID)
      .then((res) => {
        card.setLikesInfo(res.likes.length);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    api
      .addLikeToAPI("cards/likes", card.imageID)
      .then((res) => {
        card.setLikesInfo(res.likes.length);
      })
      .catch((error) => {
        console.error(error);
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
