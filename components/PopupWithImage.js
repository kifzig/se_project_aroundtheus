import Popup from "./Popup.js";
import { previewCaption, previewImage } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector }); // Creates a popup element
  }

  open(data) {
    super.open();

    previewCaption.textContent = data.caption;
    previewImage.src = data.url;
    previewImage.alt = data.caption;
  }

  close() {
    super.close();
  }
}
