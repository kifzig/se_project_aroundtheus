export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");
    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._removeEventListeners();
  }

  _handleClickClose = (evt) => {
    if (
      evt.target.classList.contains("modal_opened") ||
      evt.target.classList.contains("modal__close-button")
    )
      this.close();
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("click", this._handleClickClose);
  }

  _setEventListeners() {
    this._popupElement.addEventListener("click", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
