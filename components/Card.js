// import { openModal } from "../utils/utils.js";
import PopupWithImage from "../components/PopupWithImage.js";

export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    // this._handleCardClick = handleCardClick; //when you click on card opens preview
  }

  // printHandleCardClick {
  //   console.log(this._handleCardClick);
  // }

  _setEventListeners = () => {
    // Like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // Delete button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    // Preview picture - old method
    // this._cardElement
    //   .querySelector(".card__image")
    //   .addEventListener("click", () => {
    //     this._handlePreviewImage();
    //   });
    // //handleClick

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick();
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

  _handleCardClick() {
    const previewImagePopup = new PopupWithImage("#preview-image-modal");
    const caption = this.name;
    const url = this.link;
    const data = { caption, url };
    previewImagePopup.open(data);
  }

  // Old method to handle image preview
  // _handlePreviewImage() {
  //   // const previewImageModal = new PopupWithImage(previewImageModal);
  //   // previewImageModal.open();

  //   openModal(previewImageModal);
  //   previewCaption.textContent = this.name;
  //   previewImage.src = this.link;
  //   previewImage.alt = this.name;
  // }

  _fillCardTemplate() {
    this._cardElement.querySelector(".card__image").src = this.link;
    this._cardElement.querySelector(".card__image").alt = this.name;
    this._cardElement.querySelector(".card__caption").textContent = this.name;
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
