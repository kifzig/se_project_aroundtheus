export default class Card {
  constructor(
    { name, link, owner, _id, likes },
    cardSelector,
    handleCardClick,
    handleDeleteCardPopup,
    handleLikeClick,
    myID
  ) {
    this.name = name;
    this.link = link;
    this._ownerId = owner._id;
    this._myID = myID;
    this.imageID = _id;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardPopup = handleDeleteCardPopup;
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
    return data;
  }

  _setEventListeners = () => {
    // Like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this);
      });

    // Delete button
    if (this._myID === this._ownerId) {
      this._cardElement
        .querySelector(".card__delete-button")
        .addEventListener("click", () => {
          this._handleDeleteCardPopup(this);
        });
    }

    // Click on image for preview
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._getData());
      });
  };

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._myID);
  }

  _fillCardTemplate() {
    const imageElement = this._cardElement.querySelector(".card__image");
    imageElement.src = this.link;
    imageElement.alt = this.name;
    this._cardElement.id = this.imageID;

    this._cardElement.querySelector(".card__caption").textContent = this.name;
    if (this._myID !== this._ownerId) {
      this._cardElement.querySelector(".card__delete-button").remove();
    }

    this._renderLikes();
  }

  setLikes(numOfLikes) {
    this._likes = numOfLikes;
    this._renderLikes();
  }

  _renderLikes() {
    this._cardElement.querySelector(".card__like-count").textContent =
      this._likes.length;

    const cardLikeButton =
      this._cardElement.querySelector(".card__like-button");

    if (this.isLiked()) {
      cardLikeButton.classList.add("card__like-button_active");
    } else {
      cardLikeButton.classList.remove("card__like-button_active");
    }
  }

  _handleLikeIcon() {
    // Toggles the heart

    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
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
