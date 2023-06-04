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
    console.log("close");
    super.close();
  }
}
