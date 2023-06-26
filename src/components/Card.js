export default class Card {
  constructor(
    { name, link, owner, _id, likes },
    cardSelector,
    handleCardClick,
    handleDeleteCardConfirmPopup,
    handleLikeClick,
    myID
  ) {
    this.name = name;
    this.link = link;
    this.ownerId = owner._id;
    this.myID = myID;
    this.imageID = _id;
    this.likes = likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardConfirmPopup = handleDeleteCardConfirmPopup;
    this._handleLikeClick = handleLikeClick;
  }

  _getData() {
    const cardToPass = this;
    const data = {
      name: this.name,
      link: this.link,
      imageId: this.imageID,
      card: cardToPass,
    };
    //console.log(this);
    return data;
  }

  _setEventListeners = () => {
    // Like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this._getData());
      });

    // Delete button
    if (this.myID === this.ownerId) {
      this._cardElement
        .querySelector(".card__delete-button")
        .addEventListener("click", () => {
          this._handleDeleteCardConfirmPopup(this._getData());
        });
    }

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._getData());
      });
  };

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
    const imageElement = this._cardElement.querySelector(".card__image");
    imageElement.src = this.link;
    imageElement.alt = this.name;
    this._cardElement.id = this.imageID;

    this._cardElement.querySelector(".card__caption").textContent = this.name;
    if (this.myID !== this.ownerId) {
      this._cardElement.querySelector(".card__delete-button").remove();
    }

    if (this.likes.length > 0) {
      this.likes.forEach((user) => {
        if (user._id === this.myID) {
          this._cardElement
            .querySelector(".card__like-button")
            .classList.toggle("card__like-button_active");
        }
      });

      this._cardElement.querySelector(".card__like-count").textContent =
        this.likes.length;
    }
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    //Copy the template and get the card html
    this._cardElement = this._getTemplate();

    // Fill in the template with image and name
    this._fillCardTemplate();

    // set event listeners,

    this._setEventListeners();

    return this._cardElement;
  }
}
