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
    this.myID = myID;
    this.imageID = _id;
    this.likes = likes;
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
    if (this.myID === this._ownerId) {
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

  _fillCardTemplate() {
    const imageElement = this._cardElement.querySelector(".card__image");
    imageElement.src = this.link;
    imageElement.alt = this.name;
    this._cardElement.id = this.imageID;

    this._cardElement.querySelector(".card__caption").textContent = this.name;
    if (this.myID !== this._ownerId) {
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

  isLiked() {
    // return true if card is liked by user, otherwise false
    // loop through list of likes
    // if any like._id matches this.myID, return true

    console.log(this.likes);

    return this.likes.some((like) => like._id === this.myID);
  }

  setLikesInfo(numOfLikes) {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");

    this._cardElement.querySelector(".card__like-count").textContent =
      numOfLikes;
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
