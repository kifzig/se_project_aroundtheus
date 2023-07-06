import Popup from "./Popup.js";

import { inputSelector } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, buttonText, loadingButtonText) {
    super({ popupSelector }); // Creates a popup element
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._buttonText = buttonText;
    this._loadingButtonText = loadingButtonText;
    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  close() {
    this._popupForm.reset();
    super.close();
    this._popupElement.removeEventListener("submit", this._handleSubmit);
  }

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  _getInputValues() {
    // Collects data from all the input fields and returns
    // that data as an object
    const inputObject = {};

    const inputList = document.querySelectorAll(inputSelector);
    inputList.forEach(function (input) {
      if (input.value !== "") {
        inputObject[input.name] = input.value;
      }
    });

    return inputObject;
  }

  _handleSubmit = () => {
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  };

  _setEventListeners() {
    super._setEventListeners();
    this._popupElement.addEventListener("submit", this._handleSubmit);
  }
}
