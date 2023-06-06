export default class Popup {
  // Many of these methods may be found in the utils.js
  // You need to convert these over

  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleClickClose = (evt) => {
    const clickElement = this._popupElement;
    if (
      evt.target.classList.contains(clickElement) ||
      evt.target.classList.contains("modal__close-button")
    )
      this.close();
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      console.log("escape");
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement.addEventListener("click", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
