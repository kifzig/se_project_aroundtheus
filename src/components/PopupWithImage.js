import Popup from "./Popup.js";
import { previewCaption, previewImage } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector }); // Creates a popup element
  }

  open({ name, link }) {
    super.open();

    previewCaption.textContent = name;
    previewImage.src = link;
    previewImage.alt = name;
  }
}
