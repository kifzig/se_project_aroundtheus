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
    document.removeEventListener("keydown", this._closeByEscape);
  }

  _handleEscClose(evt) {
    if (
      evt.target.classList.contains(this._popupElement) ||
      evt.target.classList.contains("modal__close-button")
    ) {
      this.close();
    }
  }

  _closeByEscape(e) {
    if (e.key === "Escape") {
      console.log("escape");
      this.close();
    }
  }

  setEventListeners() {
    // sets event listeners for close icon
    this._popupElement.addEventListener("click", this._handleEscClose);
    this._popupElement.addEventListener("keydown", this._closeByEscape);
  }
}
