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
}

// index.js

const newCardPopup = new PopupWithForm("#add-modal", () => {});
newCardPopup.open();
newCardPopup.close();
