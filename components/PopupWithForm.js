import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector }); // Creates a popup element
    this._popupElement.querySelector("#add-image-form"); // He used the form class inside of the div
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close(); //call it for the parent
  }

  _getInputValues() {
    // Collects data from all the input fields and returns that data as an object
  }

  setEventListeners() {
    super.setEventListeners();
    //add submit event handler to the form
  }
}

// index.js
/*
const newCardPopup = new PopupWithForm("#add-modal", () => {});
newCardPopup.open();
newCardPopup.close();
*/
