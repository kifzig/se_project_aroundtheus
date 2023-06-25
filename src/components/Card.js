export default class Card {
  constructor(
    { name, link, owner, _id, likes },
    cardSelector,
    handleCardClick,
    deleteCardConfirm,
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
    this._deleteCardConfirm = deleteCardConfirm;
  }

  _getData() {
    const data = { name: this.name, link: this.link };
    return data;
  }

  _setEventListeners = () => {
    // Like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // Old delete button
    // this._cardElement
    //   .querySelector(".card__delete-button")
    //   .addEventListener("click", () => {
    //     this._handleDeleteCard();
    //   });

    // Delete button
    if (this.myID === this.ownerId) {
      this._cardElement
        .querySelector(".card__delete-button")
        .addEventListener("click", () => {
          this._deleteCardConfirm(this.imageID);
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
    imageElement.id = this.imageID;
    this._cardElement.querySelector(".card__caption").textContent = this.name;
    if (this.myID !== this.ownerId) {
      console.log("This isn't your card.");
      this._cardElement.querySelector(".card__delete-button").remove();
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
