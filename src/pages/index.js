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

/*TEST LIKING THROUGH API*/
// api.addLikeToAPI("cards/likes", "649e08f01a418409fbfa09d0");
// api.removeLikeFromAPI("cards/likes", "6498b0e2307bbb09a3af63c0");

api.updateProfilePic(
  "https://static.vecteezy.com/system/resources/previews/001/921/774/original/beautiful-woman-red-hair-in-frame-circular-avatar-character-free-vector.jpg"
);

let myUserID = null;

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

api.getUserInfo("users", "me").then((response) => {
  user.setUserInfo(response.name, response.about);
  user.setProfileImage(response.avatar);
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
/*                               Change Profile Pic  Modal                    */
/* -------------------------------------------------------------------------- */

const changeProfilePicPopup = new PopupWithForm(
  changeProfilePicModalSelector,
  handleChangeProfilePicSubmit
);

function handleChangeProfilePicSubmit(data) {
  // user.setProfileImage(imgLink);
  // api.updateProfilePic(imgLink);
  console.log(data);
  changeProfilePicPopup.close();
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

// Working on this functionality currently

function handleLikeClick(data, myID) {
  // const cardOwnerID = data.card.ownerId;
  // console.log(data);
  // console.log(data.card.likes);
  // console.log(data.card.likes.length);

  // api.addLikeToAPI("cards/likes", data.imageId).then((res) => {
  //   console.log(res);
  // });

  api.addLikeToAPI("cards/likes", data.imageId).then((response) => {
    console.log(response);
  });

  //

  // How do I tell if I like this card already?
  // let userId = "none";
  // for (let i = 0; i < this.likes.length; i++) {
  //   userId = this.likes[i]["_id"];
  //   if (userId === myUserID) {
  //     console.log("You liked this already.");
  //     api.removeLikeFromAPI("cards/likes", data.imageId);
  //     break;
  //   }
  // }

  // if (userId === "none") {
  //   api.addLikeToAPI("cards/likes", data.imageId);
  // }
}

function createCard(data) {
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
