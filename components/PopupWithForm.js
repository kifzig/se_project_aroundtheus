import Popup from "./Popup.js";

import {
  profileTitle,
  profileDesc,
  inputTitle,
  inputDesc,
  editProfileModal,
  editProfileButton,
  inputSelector,
  editFormElement,
} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector }); // Creates a popup element
    this._popupElement.querySelector(popupSelector); // He used the form class inside of the div
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  open() {
    // Change this.
    super.open();
    // Put existing values in form?
  }

  close() {
    this._popupForm.reset();
    super.close(); //call it for the parent
  }

  _getInputValues() {
    // Collects data from all the input fields and returns
    //that data as an object
    const inputList = Array.from(document.querySelectorAll(inputSelector));
    console.log(inputList);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._handleFormSubmit);
    this._getInputValues();

    //add submit event handler to the form
  }
}

/*
const handleFmSubmit = function (evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileDesc.textContent = inputDesc.value;
  this.close();
};

// index.js

const newCardPopup = new PopupWithForm("#add-modal", function => {});
newCardPopup.open();
newCardPopup.close();

new PopupWithForm("#edit-profile-modal", function => {});

*/
