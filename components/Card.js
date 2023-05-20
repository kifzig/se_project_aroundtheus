export default class Card {
  constructor({ name, link }, cardSelector) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // Like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // Delete button
    this._cardElement(".card__delete-button").addEventListener("click", () => {
      this._handleDeleteCard();
    });

    // Preview picture
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        alert("Preview Image");
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _fillCardTemplate() {
    this._cardElement.querySelector(".card__image").src = this.link;
    this._cardElement.querySelector(".card__image").alt = this.name;
    this._cardElement.querySelector(".card__caption").textContent = this.name;
  }

  getView() {
    //Copy the template and get the card html
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // Fill in the template with image and name
    this._fillCardTemplate();

    // set event listeners,
    this._setEventListeners();

    return this._cardElement;
  }
}
