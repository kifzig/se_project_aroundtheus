import Popup from "./Popup.js";
import { inputSelector } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector }); // Creates a popup element
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  open() {
    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
    this._popupElement.removeEventListener("submit", this._handleSubmit);
  }

  _getInputValues() {
    // Collects data from all the input fields and returns
    // that data as an object
    const inputObject = {};

    this._inputList = document.querySelectorAll(inputSelector);
    this._inputList.forEach(function (input) {
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

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._handleSubmit);
  }
}
