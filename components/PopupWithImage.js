import Popup from "./Popup.js";
import { previewCaption, previewImage } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector }); // Creates a popup element
  }

  open(data) {
    super.open();

    previewCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
    console.log(data.name);
  }

  close() {
    super.close();
    console.log("close");
  }
}

/* From Card.js 

    // Preview picture
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewImage();
      });

  _handlePreviewImage() {
    openModal(previewImageModal);
    previewCaption.textContent = this.name;
    previewImage.src = this.link;
    previewImage.alt = this.name;
  }



*/
